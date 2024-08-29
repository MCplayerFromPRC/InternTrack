"use client";
/*
## quote:
1. https://github.com/apollographql/apollo-client-nextjs/blob/main/examples/polls-demo/app/cc/poll-cc.tsx
*/
export interface IWarningInfo {
  id: string;
  message: string;
  taskId?: string;
}
import React from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { SimpleGraph } from "@/app/ui/roadmap/SimpleGraph";
import Loading from "@/app/dashboard/(overview)/loading";
import {
  RoadmapQuery,
  RoadmapDocument,
  RoadmapQueryVariables,
  EvalResultQuery,
  EvalResultQueryVariables,
  EvalResultDocument,
  TrainConfigDocument,
  TrainConfigQuery,
  TrainConfigQueryVariables,
} from "@/app/gql/fragments.generated";
import useSpecialQueue from "./detail_queue";
import DetailCard from "@/app/ui/detail/Config";
import { message } from "antd";

export const GraphWrapper = () => {
  return (
    <Suspense fallback={<Loading />}>
      <RoadmapGraph />
    </Suspense>
  );
};

export const RoadmapGraph = () => {
  const [roadMapData, setRoadMapData] = useState<any>(null);
  const [graphViewData, setGraphViewData] = useState<RGJsonData | null>(null);
  const { enqueue, dequeue, queue } = useSpecialQueue<string>(); // 留给config代码块的
  const [warningList, setWarning] = useState<IWarningInfo[]>([]);
  const [cardType, setCardType] = useState("");
  const [tableRes, setTableRes] = useState<any[]>([]);
  const [stashedTableRes, setStashedTableRes] = useState<any[]>([]);
  const [showDiscard, setShowDiscard] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const [viewType, setViewType] = useState("ckpt");
  const [fetchData] = useLazyQuery<RoadmapQuery, RoadmapQueryVariables>(
    RoadmapDocument,
  ); // fetchData是留给search的
  const [getEvalRes] = useLazyQuery<EvalResultQuery, EvalResultQueryVariables>(
    EvalResultDocument,
  );
  const [getConfigInfo] = useLazyQuery<
    TrainConfigQuery,
    TrainConfigQueryVariables
  >(TrainConfigDocument);
  const closePopMask = (idx: number) => {
    if (cardType === "result") {
      setTableRes([]);
      setStashedTableRes([]);
      setShowDiscard(false);
    } else {
      dequeue(idx);
    }
  };

  const handleSearch = (newSearchKey: string) => {
    // 搜索框里search的点击
    if (!newSearchKey) {
      message.warning("请输入搜索词！");
      return;
    }
    setKeyWord(newSearchKey);
  };

  const fetchNewData = async () => {
    // type类型ckpt或者config
    const result = await fetchData({ variables: { keyword, viewType } });
    console.log('search or viewtype changed, res is------', result?.data?.roadmap);
    setRoadMapData(result?.data?.roadmap);
  };

  const showGraph = async (graphViewData: RGJsonData) => {
    console.log("show graph-----");
    // 获取数据渲染画布
    const graphInstance = graphRef.current!.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(graphViewData);
      await graphInstance.refresh();
      // await graphInstance.toggleAutoLayout();
      // await graphInstance.moveToCenter();
      // await graphInstance.zoomToFit();
    }
  };

  const queryConfig = async (nodeId: string) => {
    // 根据id请求config信息
    const configInfo = await getConfigInfo({ variables: { id: nodeId } });
    console.log("configInfo-----", configInfo);
    const config = configInfo?.data?.trainConfig?.configContent || "";
    setShowDiscard(true);
    enqueue(nodeId, config);
  };

  const generateTableData = (arrA: any[], arrB: any[]) => {
    const tempArr = [...arrA];
    // 遍历数组b，检查每个项的datasetMd5是否不在集合中
    arrB.forEach((itemB) => {
      // 检查itemB的datasetMd5是否存在于数组a中
      const exists = arrA.some(
        (itemA) => (itemA.datasetMd5 === itemB.datasetMd5 && itemA.subsetName === itemB.subsetName),
      );
      if (!exists) {
        // 如果不存在，将itemB添加到数组a中，并添加新的scoreCompare属性用于比对
        const newItem = { ...itemB, score: '', scoreCompare: itemB.score }; // 简单的比对逻辑，实际应用可能需要调整
        tempArr.push(newItem);
      } else {
        // 如果存在，新增comparescore
        const itemIndex = tempArr.findIndex(item => (item.datasetMd5 === itemB.datasetMd5 && item.subsetName === itemB.subsetName));
        console.log('find index----', itemIndex);
        tempArr[itemIndex].scoreCompare = itemB.score;
      }
    });
    return tempArr;
  };

  const queryTableRes = async (nodeId: string) => {
    const tableData = await getEvalRes({ variables: { ckptId: nodeId } });
    if (!tableData?.data?.evalResult?.scores?.length) {
      message.warning("获取该节点的评测结果失败！");
      return;
    }
    queue.forEach((item, idx) => {
      dequeue(idx);
    });
    // 最后一次请求的表格数据
    const finalData = stashedTableRes.length ? generateTableData(stashedTableRes, tableData?.data?.evalResult?.scores) : tableData?.data?.evalResult?.scores;
    setTableRes(finalData);
    setStashedTableRes(tableData?.data?.evalResult?.scores || []);
    setShowDiscard(true);
  };

  const handleInfoBar = (nodeId: string, type: string = "config") => {
    console.log("handleInfoBar------", nodeId, type);
    setCardType(type);
    // 代码框渲染相关
    if (type === "config") {
      queryConfig(nodeId);
    }

    if (type === "result") {
      queryTableRes(nodeId);
    }
  };

  const generateGraphData = () => {
    const { nodes, lines, warnings } = roadMapData;
    // 处理warning数据
    if (warnings?.length) {
      setWarning(warnings);
    }
    const temp: any = {};
    temp.nodes = nodes.map(
      ({
        id,
        type,
        isDeliveryBranch,
        taskName,
        step,
        hasEvalResult,
        config = "",
      }: any) => {
        return {
          id,
          type,
          nodeShape: type === "task" ? 1 : 0,
          text: type === "task" ? taskName : step,
          borderWidth: isDeliveryBranch ? 4 : 0,
          borderColor: isDeliveryBranch ? "#f90" : "",
          data: {
            hasEvalResult,
            isDeliveryBranch,
            config,
          },
        };
      },
    );
    temp.lines = lines.map(({ from, to }: any) => {
      return {
        from,
        to,
      };
    });
    setGraphViewData(temp);
  };

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    // 没有lines和nodes就不展示图
    if (!graphViewData?.nodes?.length || !graphViewData?.lines?.length) return;
    showGraph(graphViewData);
  }, [graphViewData]);

  useEffect(() => {
    if (!roadMapData) return;
    generateGraphData();
  }, [roadMapData]);

  useEffect(() => {
    if (!keyword) return;
    console.log("keyword changed-----", keyword);
    fetchNewData();
  }, [keyword]);

  useEffect(() => {
    console.log("viewType changed-----", viewType);
    fetchNewData();
  }, [viewType]);

  return (
    <div>
      {showDiscard && (queue.length > 0 || tableRes.length > 0) && (
        <DetailCard
          onclickFuncs={closePopMask}
          queue={queue}
          tableRes={tableRes}
          cardType={cardType}
        />
      )}
      <SimpleGraph
        changeViewType={(val: string) => {
          setViewType(val);
        }}
        upDateViewData={fetchNewData}
        warningList={warningList}
        graphRef={graphRef}
        onPanelClick={handleSearch}
        onNodeClickFn={handleInfoBar}
      />
    </div>
  );
};

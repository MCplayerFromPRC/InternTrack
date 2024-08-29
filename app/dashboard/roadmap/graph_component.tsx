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
import React from 'react';
import { Suspense, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { SimpleGraph } from "@/app/ui/roadmap/SimpleGraph";
import Loading from "@/app/dashboard/(overview)/loading"
import {
  RoadmapQuery,
  RoadmapDocument,
  RoadmapQueryVariables,
  EvalResultQuery,
  EvalResultQueryVariables,
  EvalResultDocument,
  TrainConfigDocument,
  TrainConfigQuery,
  TrainConfigQueryVariables
} from "@/app/gql/fragments.generated";
import useSpecialQueue from "./detail_queue"
import DetailCard from "@/app/ui/detail/Config";
import { message } from 'antd';

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
  const [cardType, setCardType] = useState('');
  const [tableRes, setTableRes] = useState<any[]>([]);
  const [showDiscard, setShowDiscard] = useState(false);
  const [keyword, setKeyWord] = useState('');
  const [viewType, setViewType] = useState('ckpt');
  const [fetchData] = useLazyQuery<RoadmapQuery, RoadmapQueryVariables>(RoadmapDocument, { variables: { keyword, viewType } }); // fetchData是留给search的
  const [getEvalRes] = useLazyQuery<EvalResultQuery, EvalResultQueryVariables>(EvalResultDocument);
  const [getConfigInfo] = useLazyQuery<TrainConfigQuery, TrainConfigQueryVariables>(TrainConfigDocument);
  const closePopMask = (idx: number) => {
    if (cardType === 'result') {
      setTableRes([]);
      setShowDiscard(false);
    } else {
      dequeue(idx);
    }
  };

  const handleSearch = (newSearchKey: string) => {
    // 搜索框里search的点击
    if (!newSearchKey) {
      message.warning('请输入搜索词！');
      return;
    }
    console.log('keyword----', newSearchKey);
    setKeyWord(newSearchKey);

  };

  const fetchNewData = async () => {
    // type类型ckpt或者config
    const result = await fetchData();
    console.log('search or viewtype changed, res is------', result?.data?.roadmap);
    setRoadMapData(result?.data?.roadmap);
  };

  const showGraph = async (graphViewData: RGJsonData) => {
    console.log('show graph-----');
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
    // TODO: 根据id请求config信息
    const config = `${nodeId}--------
    parallel = dict(
      zero1=dict(size=-1),
      tensor=dict(size=16, mode="fsp"),
      pipeline=dict(size=1, interleaved_overlap=True),
      weight=dict(size=1, overlap=True, memory_pool=True)
    )
    DATASET_WEIGHTS = {
      "github_go": 9.155192239672025e-05,
      "github_javascript": 0.0003424044244706788,
      "starcoder_cpp": 0.0003331215920434134,
      "starcoder_python": 0.00041252998315727664,
      "github_python": 0.00019326974814897545,
    }
    data = dict(
      type=DATASET_TYPE,
      tokenizer_wrapper=TOKENIZER_WRAPPER_TYPE,
      train_folder=TRAIN_FOLDER,
      valid_folder=VALID_FOLDER,
      num_worker=4,
      gradient_accumulation=GRADIENT_ACCUMULATION,
      text_field="content",
      drop_last=True,
      tokenizer_chunk_num=512,
    )`;
    const configInfo = await getConfigInfo({ variables: { id: nodeId } });
    console.log('configInfo-----', configInfo);
    setShowDiscard(true);
    enqueue(nodeId, config);
  };

  const queryTableRes = async (nodeId: string) => {
    const tableData = await getEvalRes({ variables: { ckptId: nodeId } });
    queue.forEach((item, idx) => {
      dequeue(idx);
    })
    setShowDiscard(true);
    setTableRes(tableData?.data?.evalResult?.scores || []);
  };

  const handleInfoBar = (nodeId: string, type: string = 'config') => {
    console.log(nodeId);
    setCardType(type);
    // 代码框渲染相关
    if (type === 'config') {
      queryConfig(nodeId);
    }

    if (type === 'result') {
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
    temp.nodes = nodes.map(({ id, type, isDeliveryBranch, taskName, step, hasEvalResult }: any) => {
      return {
        id,
        type,
        nodeShape: type === 'task' ? 1 : 0,
        text: type === 'task' ? taskName : step,
        borderWidth: isDeliveryBranch ? 4 : 0,
        borderColor: isDeliveryBranch ? '#f90' : '',
        data: {
          hasEvalResult,
          isDeliveryBranch
        }
      }
    });
    temp.lines = lines.map(({ from, to }: any) => {
      return {
        from,
        to
      }
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
    console.log('keyword changed-----', keyword);
    fetchNewData();
  }, [keyword]);

  useEffect(() => {
    console.log('viewType changed-----', viewType);
    fetchNewData();
  }, [viewType]);

  return (
    <div>
      {(showDiscard && (queue.length > 0 || tableRes.length > 0)) && (
        <DetailCard onclickFuncs={closePopMask} queue={queue} tableRes={tableRes} cardType={cardType} />
      )}
      <SimpleGraph
        changeViewType={(val: string) => { setViewType(val) }}
        warningList={warningList}
        graphRef={graphRef}
        onPanelClick={handleSearch}
        onNodeClickFn={handleInfoBar}
      />
    </div>
  );
};

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
import { useReadQuery, useBackgroundQuery, useLazyQuery } from "@apollo/client";
import { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { QueryRef } from "@apollo/client/react";
import { SimpleGraph } from "@/app/ui/roadmap/SimpleGraph";
import Loading from "@/app/dashboard/(overview)/loading"
import { RoadmapQuery, RoadmapDocument, RoadmapQueryVariables } from "@/app/gql/fragments.generated"
// import { layout } from "./client_layout"
import useSpecialQueue from "./detail_queue"
import DetailCard from "@/app/ui/detail/Config";
import { mockData } from './mock';

export const GraphWrapper = () => {
  const [queryRef] = useBackgroundQuery<RoadmapQuery>(RoadmapDocument);
  return (
    <Suspense fallback={<Loading />}>
      <RoadmapGraph queryRef={queryRef} />
    </Suspense>
  );
};

export const RoadmapGraph = ({
  queryRef,
}: {
  queryRef: QueryRef<RoadmapQuery, RoadmapQueryVariables>;
}) => {
  const { data } = useReadQuery(queryRef);
  console.log('roadmap data-----', data);
  const [fetchData] = useLazyQuery<RoadmapQuery, RoadmapQueryVariables>(RoadmapDocument, { variables: {} }); // fetchData是留给search的
  // TODO: 数据现在是mock的，要换成接口请求
  const [graphViewData, setGraphViewData] = useState<RGJsonData | null>(null);
  const { enqueue, dequeue, isEmpty, queue } = useSpecialQueue<string>(); // 留给代码块的
  const [warningList, setWarning] = useState<IWarningInfo[]>([]);

  const handleSearch = async (newSearchKey: string) => {
    console.log('keyword----', newSearchKey);
    // 搜索框里search的点击
    let result;
    if (newSearchKey) {
      result = await fetchData();
    } else {
      result = await fetchData();
    }
    console.log(result);
    // setGraphViewData(layout(result.data as RoadmapQuery));
  };

  const showGraph = async (graphViewData: RGJsonData) => {
    // 获取数据渲染画布
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(graphViewData);
    await graphInstance.toggleAutoLayout();
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  const handleInfoBar = (nodeId: string) => {
    console.log(nodeId);
    // 代码框渲染相关
    // TODO: 根据id请求config信息
    const config = `parallel = dict(
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
    )`
    enqueue('nodeName111', config);
  };

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    // 没有lines和nodes就不展示图
    if (!graphViewData?.nodes?.length || !graphViewData?.lines?.length) return;
    showGraph(graphViewData);
  }, [graphViewData]);

  useEffect(() => {
    if (!mockData) return;
    console.log('mock data is-----', mockData);
    const { nodes, lines, warnings } = mockData;
    // 处理warning数据
    if (warnings.length) {
      setWarning(warnings);
    }
    const temp: any = { rootId: mockData.rootId };
    temp.nodes = nodes.map(({ id, type, isDeliveryBranch, taskName, step }) => {
      return {
        id,
        type,
        nodeShape: type === 'task' ? 1 : 0,
        text: type === 'task' ? taskName : step,
        borderWidth: 0,
        borderColor: isDeliveryBranch ? '#f90' : '',
      }
    });
    temp.lines = lines.map(({ from, to }) => {
      return {
        from,
        to
      }
    });
    setGraphViewData(temp);
  }, [mockData]);

  return (
    <div>
      {!isEmpty && (
        <DetailCard onclickFuncs={dequeue} queue={queue} />
      )}
      <SimpleGraph
        warningList={warningList}
        graphRef={graphRef}
        onPanelClick={handleSearch}
        onNodeClickFn={handleInfoBar}
      />
    </div>
  );
};

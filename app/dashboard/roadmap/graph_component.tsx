"use client";
/*
## quote:
1. https://github.com/apollographql/apollo-client-nextjs/blob/main/examples/polls-demo/app/cc/poll-cc.tsx
*/


import { Suspense, useEffect, useRef, useState } from "react";
import { useReadQuery, useBackgroundQuery, useLazyQuery } from "@apollo/client";
import type { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { QueryRef } from "@apollo/client/react";
import { SimpleGraph } from "@/app/ui/roadmap/SimpleGraph";
import Loading from "@/app/dashboard/(overview)/loading"
import { RoadmapQuery, RoadmapDocument, RoadmapQueryVariables } from "@/app/gql/fragments.generated"
import { layout } from "./client_layout"
import useSpecialQueue from "./detail_queue"
import DetailCard from "@/app/ui/detail/Config";


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  zIndex: 1000
};


export const GraphWrapper = () => {
  const [queryRef] = useBackgroundQuery<RoadmapQuery>(RoadmapDocument);

  return (
    <Suspense fallback={<Loading />}>
      <RoadmapGraph queryRef={queryRef} />
    </Suspense>
  );
};

export const RoadmapGraph = ({ queryRef }: { queryRef: QueryRef<RoadmapQuery, RoadmapQueryVariables> }) => {
  const { data } = useReadQuery(queryRef);
  const [fetchData, { called, refetch }] = useLazyQuery<RoadmapQuery, RoadmapQueryVariables>(RoadmapDocument, { variables: {} }); // fetchData是留给search的
  const [graphViewData, setGraphViewData] = useState(layout(data));
  const { enqueue, dequeue, isEmpty, queue } = useSpecialQueue<string>(); // 留给代码块的

  const handleClick = async (newSearchKey: string) => {
    // 搜索框里search的点击
    let result;
    if (newSearchKey) {
      result = await fetchData();
    } else {
      result = await fetchData();
    }
    setGraphViewData(layout(result.data as RoadmapQuery));
  };

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph(graphViewData);
  }, [graphViewData]);

  const showGraph = async (graphViewData: RGJsonData) => {
    // 获取数据渲染画布
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(graphViewData);
    await graphInstance.toggleAutoLayout();
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  const toggleRndData = (data: string) => {
    // 代码框渲染相关
    enqueue(data);
  };

  return (
    <div>
      {!isEmpty && (
        <DetailCard onclickFuncs={dequeue} children={queue}></DetailCard>
      )}
      <SimpleGraph
        graphRef={graphRef}
        onPanelClick={handleClick}
        onNodeClickFn={toggleRndData}
      />
    </div>
  );
};
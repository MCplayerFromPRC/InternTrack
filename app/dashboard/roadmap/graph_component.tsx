"use client";
/*
## quote:
1. https://github.com/apollographql/apollo-client-nextjs/blob/main/examples/polls-demo/app/cc/poll-cc.tsx
*/


import { Suspense, useEffect, useRef, useState } from "react";
import { useReadQuery, useBackgroundQuery, useLazyQuery } from "@apollo/client";
import { RGJsonData, RelationGraphComponent } from "relation-graph-react";
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
  console.log('roadmap data-----', data);
  const [fetchData, { called, refetch }] = useLazyQuery<RoadmapQuery, RoadmapQueryVariables>(RoadmapDocument, { variables: {} }); // fetchData是留给search的
  // const [graphViewData, setGraphViewData] = useState(layout(data));
  // TODO: mock
  const [graphViewData, setGraphViewData] = useState<RGJsonData>({
    rootId: 'a',
    nodes: [
      { id: 'a', text: 'node1', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
      { id: 'a1', text: '3000', borderColor: 'yellow' },
      { id: 'a2', text: 'node2', nodeShape: 1 },
      { id: 'a3', text: '6000', borderColor: 'yellow' },

      { id: 'b', text: 'b node3', nodeShape: 1 },
      { id: 'b1', text: '1000', borderColor: 'yellow' },
      { id: 'b2', text: 'b node2', nodeShape: 1 },
      { id: 'b3', text: '2000', borderColor: 'yellow' },
      // { id: 'a1', text: 'No border', borderWidth: -1, color: '#ff8c00' },
      // { id: 'a2', text: 'Plain', borderWidth: 3, color: 'transparent', borderColor: '#ff8c00', fontColor: '#ff8c00' },
      // // Unless it is absolutely necessary, it is not recommended to use the html attribute, you can use the node slot to display the node in any form

      // { id: 'a1-1', html: '<span style="color:#ff8c00">Text Node</span>' },
      // { id: 'a1-4', html: '<div style="border:#ff8c00 solid 2px;height:80px;width:80px;border-radius: 40px;background-image: url(/images/rg-logo.png);background-position: center center;" />', nodeShape: 0 },
      // { id: 'b', text: 'Font color', color: '#43a2f1', fontColor: '#ffd700' },
      // { id: 'd', text: 'Node Size', width: 150, height: 150, color: '#ff8c00', borderWidth: 5, borderColor: '#ffd700', fontColor: '#ffffff' },
      // { id: 'e', text: 'Rectangular node', nodeShape: 1 },
      // { id: 'f', text: 'Rectangular', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
      // { id: 'f1', text: 'Fixed', fixed: true, x: 60, y: 60 },
      // { id: 'g', text: 'Css Flash', styleClass: 'my-node-flash-style' }
    ],
    lines: [
      { from: 'a', to: 'a1' },
      { from: 'a1', to: 'a2' },
      { from: 'a2', to: 'a3' },
      { from: 'a1', to: 'b' },
      { from: 'b', to: 'b1' },
      { from: 'b1', to: 'b2' },
      { from: 'b2', to: 'b3' }
    ]
  });
  const { enqueue, dequeue, isEmpty, queue } = useSpecialQueue<string>(); // 留给代码块的

  const handleClick = async (newSearchKey: string) => {
    // 搜索框里search的点击
    let result;
    if (newSearchKey) {
      result = await fetchData();
    } else {
      result = await fetchData();
    }
    // setGraphViewData(layout(result.data as RoadmapQuery));
  };

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    // 没有lines和nodes就不展示图
    if (!graphViewData.nodes.length || !graphViewData.lines.length) return;
    showGraph(graphViewData);
  }, [graphViewData]);

  const showGraph = async (graphViewData: RGJsonData) => {
    // const rootX = 0;
    // const rootY = 0;
    // const tempNodesData = graphViewData.nodes.map((item: any, idx: number) => {
    //   return {...item, x: rootX, y: rootY}
    // });
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
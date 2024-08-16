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
      { id: 'a', text: 'node1', nodeShape: 1, type: 'config' },
      { id: 'a1', text: 'step:3000', nodeShape: 0, type: 'ckpt' },
      { id: 'a2', text: 'node2', nodeShape: 1, type: 'config' },
      { id: 'a3', text: 'step:6000', type: 'ckpt', nodeShape: 0 },

      { id: 'b', text: 'b-node3', nodeShape: 1, type: 'config' },
      { id: 'b1', text: 'step:1000', type: 'ckpt', nodeShape: 0 },
      { id: 'b2', text: 'b-node2', nodeShape: 1, type: 'config' },
      { id: 'b3', text: 'step:2000', type: 'ckpt', nodeShape: 0 },

      { id: 'c', text: 'c-node3', nodeShape: 1, type: 'config' },
      { id: 'c1', text: 'step:1000', type: 'ckpt', nodeShape: 0 },
      { id: 'd', text: 'd-node2', nodeShape: 1, type: 'config' },
      { id: 'd1', text: 'step:2000', type: 'ckpt', nodeShape: 0 },
      { id: 'e', text: 'e-node1', nodeShape: 1, type: 'config' },
      { id: 'e1', text: 'step:4000', type: 'ckpt', nodeShape: 0 },
    ],
    lines: [
      { from: 'a', to: 'a1' },
      { from: 'a1', to: 'a2' },
      { from: 'a2', to: 'a3' },
      { from: 'a1', to: 'b' },
      { from: 'b', to: 'b1' },
      { from: 'b1', to: 'b2' },
      { from: 'b2', to: 'b3' },
      { from: 'a3', to: 'c' },
      { from: 'c', to: 'c1' },
      { from: 'a3', to: 'd' },
      { from: 'd', to: 'd1' },
      { from: 'a3', to: 'e' },
      { from: 'e', to: 'e1' }
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
    // let rootX = 0;
    // let rootY = 0;
    // const nodeTempInfo: any = {};
    // const tempNodesData = graphViewData.nodes.map((item: any, idx: number) => {
    //   rootX = rootX + 300;
    //   if (item.from) {
    //     rootX = nodeTempInfo[item.from].x;
    //     rootY = nodeTempInfo[item.from].y + 200;
    //   }
    //   nodeTempInfo[item.id] = {
    //     x: rootX,
    //     y: rootY
    //   }
    //   return { ...item, x: rootX, y: rootY };
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
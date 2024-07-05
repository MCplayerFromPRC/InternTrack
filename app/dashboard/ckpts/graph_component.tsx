"use client";
/*
## quote:
1. https://github.com/apollographql/apollo-client-nextjs/blob/main/examples/polls-demo/app/cc/poll-cc.tsx
*/

import { Suspense } from "react";
import { useQuery, useReadQuery, useBackgroundQuery, gql } from "@apollo/client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { QueryRef } from "@apollo/client/react";
import { SimpleGraph } from "@/app/ui/ckpts/SimpleGraph";
import { RoadmapQuery, RoadmapDocument, RoadmapQueryVariables } from "@/app/gql/fragments.generated"
import {layout} from "./client_layout"


export const GraphWrapper = () => {
  const [queryRef] = useBackgroundQuery<RoadmapQuery>(RoadmapDocument);

  return (
    <Suspense fallback={<>Loading...</>}>
      <RoadmapGraph queryRef={queryRef} />
    </Suspense>
  );
};

export const RoadmapGraph = ({ queryRef }: { queryRef: QueryRef<RoadmapQuery, RoadmapQueryVariables> }) => {
  const { data } = useReadQuery(queryRef);
  const [graphViewData, setGraphViewData] = useState(layout(data));

  const handleClick = useCallback(
    async (searchKey: string) => {
      const { data } = useQuery(queryRef, {
        variables: { key: searchKey },
        skip: !searchKey,
      });

      setGraphViewData(layout(data));
    },
    []
  );

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph(graphViewData);
  }, [graphViewData]); // 使用 useCallback 处理的函数作为依赖

  const showGraph = async (graphViewData: RGJsonData) => {
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(graphViewData);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  return (
    <SimpleGraph 
      graphRef={graphRef}
      onPanelClick={handleClick}
    />
  );
};

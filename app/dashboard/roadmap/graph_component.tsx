"use client";
/*
## quote:
1. https://github.com/apollographql/apollo-client-nextjs/blob/main/examples/polls-demo/app/cc/poll-cc.tsx
*/

import { Suspense } from "react";
import { useQuery, useReadQuery, useBackgroundQuery } from "@apollo/client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { QueryRef } from "@apollo/client/react";
import { SimpleGraph } from "@/app/ui/roadmap/SimpleGraph";
import Loading from "@/app/dashboard/(overview)/loading"
import { RoadmapQuery, RoadmapDocument, RoadmapQueryVariables } from "@/app/gql/fragments.generated"
import { layout } from "./client_layout"


export const GraphWrapper = () => {
  const [queryRef] = useBackgroundQuery<RoadmapQuery>(RoadmapDocument);

  return (
    <Suspense fallback={<Loading />}>
      <RoadmapGraph queryRef={queryRef} />
    </Suspense>
  );
};

function useSearchQuery(
  queryRef: QueryRef<RoadmapQuery, RoadmapQueryVariables>, 
  initialData: RGJsonData
) {
  const [graphViewData, setGraphViewData] = useState(initialData);

  const handleSearch = useCallback((searchKey: string) => {
    if (!searchKey) {
      setGraphViewData(initialData);
      return;
    }

    const { loading, error, data } = useQuery(RoadmapDocument, {
      variables: { key: searchKey },
    });

    if (!loading && !error && data) {
      setGraphViewData(layout(data));
    }
  }, [queryRef, initialData]);

  return { graphViewData, handleSearch };
}

export const RoadmapGraph = ({ queryRef }: { queryRef: QueryRef<RoadmapQuery, RoadmapQueryVariables> }) => {
  const { data } = useReadQuery(queryRef);
  const { graphViewData, handleSearch } = useSearchQuery(queryRef, layout(data));

  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph(graphViewData);
  }, [graphViewData]);

  const showGraph = async (graphViewData: RGJsonData) => {
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(graphViewData);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  return (
    <SimpleGraph 
      graphRef={graphRef}
      onPanelClick={handleSearch}
    />
  );
};

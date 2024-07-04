"use client";
import { Suspense } from "react";
import { useQuery, useReadQuery, useBackgroundQuery, gql } from "@apollo/client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { RGJsonData, RelationGraphComponent } from "relation-graph-react";
import { QueryRef } from "@apollo/client/react";
import SimpleGraph from "@/app/ui/ckpts/SimpleGraph";

export const PollWrapper = () => {
  const [queryRef] = useBackgroundQuery(GetPollDocument, {
    variables: { id: "1", delay: 0 },
  });

  return (
    <Suspense fallback={<>Loading...</>}>
      <Poll queryRef={queryRef} />
    </Suspense>
  );
};

const GET_DATA = gql`
  query GetData($key: String!) {
    data(key: $key) {
      id
      value
    }
  }
`;

const Poll = ({ queryRef }: { queryRef: QueryRef<GetPollQuery> }) => {
  const { data } = useReadQuery(queryRef);
  const [graphViewData, setGraphViewData] = useState(data);

  const handleClick = useCallback(
    async (searchKey: string) => {
      const { data } = useQuery(queryRef, {
        variables: { key: searchKey },
        skip: !searchKey,
      });

      setGraphViewData(data);
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

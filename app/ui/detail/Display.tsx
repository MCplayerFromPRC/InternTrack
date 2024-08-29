"use client";

import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Compare } from "./Compare";
import { useEffect, useState } from "react";
export interface INodeInfo {
  id?: string;
  name: string;
  config: string;
  type?: string;
}
interface IProps {
  width: string;
  height: string;
  nodeInfo?: INodeInfo;
  queue: INodeInfo[];
}

export const Display = (props: IProps) => {
  const { queue, width, height } = props;
  const [nodeInfo, setNodeInfo] = useState<INodeInfo>({
    name: "",
    config: "",
    type: "",
  });

  useEffect(() => {
    console.log("queue info-----", queue.length, queue);
    setNodeInfo(queue?.[0]);
  }, [queue]);

  return (
    <div style={{ width: width, height: height }}>
      {queue[0] && queue[1] && (
        <Compare
          nodeInfo1={queue[0]}
          nodeInfo2={queue[1]}
          width={width}
          height={height}
        />
      )}
      {queue[0] && !queue[1] && (
        <CodeMirror value={nodeInfo?.config} extensions={[langs.python()]} />
      )}
    </div>
  );
};

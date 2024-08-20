'use client'

import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
export interface INodeInfo {
  name: string;
  config: string;
}
interface IProps {
  width: string;
  height: string;
  nodeInfo: INodeInfo;
}

export const Display = (props: IProps) => {
  const { nodeInfo, width, height } = props;
  return (
    <div style={{ width: width, height: height }}>
      {/* <div>{nodeInfo.name}</div> */}
      <CodeMirror value={nodeInfo.config} extensions={[langs.python()]} />
    </div>
  )
}
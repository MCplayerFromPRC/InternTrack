'use client'

import CodeMirrorMerge from 'react-codemirror-merge';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { INodeInfo } from './Display';

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export const Compare = ({ nodeInfo1, nodeInfo2, width, height }: { nodeInfo1: INodeInfo, nodeInfo2: INodeInfo, width: string, height: string }) => {
  return (
    <div style={{ width: width, height: height }}>
      <CodeMirrorMerge>
        <Original value={nodeInfo1.config} />
        <Modified
          value={nodeInfo2.config}
          extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true)]}
        />
      </CodeMirrorMerge>
    </div>
  );
};
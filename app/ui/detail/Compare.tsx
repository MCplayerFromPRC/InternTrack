'use client'

import CodeMirrorMerge from 'react-codemirror-merge';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export const Compare = ({doc1, doc2, width, height}: {doc1: string, doc2: string, width: number | string, height: number | string}) => {
  return (
    <div style={{ width: width, height: height }}>
      <CodeMirrorMerge>
        <Original value={doc1} />
        <Modified
          value={doc2}
          extensions={[EditorView.editable.of(false), EditorState.readOnly.of(true)]}
        />
      </CodeMirrorMerge>
    </div>
  );
};
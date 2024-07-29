'use client'

import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';


export const Display = ({doc, width, height}: {doc: string, width: number | string, height: number | string}) => {
  return (
    <div style={{ width: width, height: height }}>
      <CodeMirror value={doc} extensions={[langs.python()]} />
    </div>
  )
}
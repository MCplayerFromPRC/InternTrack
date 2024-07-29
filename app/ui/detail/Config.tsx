'use client'

import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Compare } from "./Compare"
import { Display } from "./Display"


const style = {
  display: "flex",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
  zIndex: 1000
};

export default function DetailCard({onclickFuncs, children}:{
  onclickFuncs: CallableFunction[],
  children: (string | null)[]
}) {
  const [size, setSize] = useState({ width: "500", height: "300" });

  return (
    <Rnd
      style={style}
      default={{
        x: 100,
        y: 250,
        width: 500,
        height: 300
      }}
      resizeHandleComponent={{ 
        topLeft: children[0] ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs[0]()}><XCircleIcon className="h-10 w-10" /></Button>): undefined,
        topRight: children[1] ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs[1]()}><XCircleIcon className="h-10 w-10" /></Button>): undefined,
      }}
      onResize={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height
        });
      }}
    >
      {
        children[0] && (
          children[1] ? (
            <Compare doc1={children[0]} doc2={children[1]} width={size.width} height={size.height}></Compare>
          ) : (
            <Display doc={children[0]} width={size.width} height={size.height}></Display>
          )
        )
      }
    </Rnd>
  )
}
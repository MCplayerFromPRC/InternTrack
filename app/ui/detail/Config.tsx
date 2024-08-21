'use client'
import React from "react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Compare } from "./Compare"
import { Display } from "./Display"
import './code-module.scss';

export default function DetailCard({ onclickFuncs, queue }: {
  onclickFuncs: CallableFunction[],
  queue: (any)[]
}) {
  const [size, setSize] = useState({ width: "500", height: "500" });

  return (
    <Rnd
      className="rnd-container"
      default={{
        x: 100,
        y: 250
      }}
      resizeHandleComponent={{
        topLeft: queue[0] ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs[0]()}><XCircleIcon className="h-10 w-10" /></Button>) : undefined,
        topRight: queue[1] ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs[1]()}><XCircleIcon className="h-10 w-10" /></Button>) : undefined,
      }}
      onResize={(ref: any) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height
        });
      }}
    >
      {
        queue[0] && (
          queue[1] ? (
            <Compare nodeInfo1={queue[0]} nodeInfo2={queue[1]} width={size.width} height={size.height}></Compare>
          ) : (
            <Display nodeInfo={queue[0]} width={size.width} height={size.height}></Display>
          )
        )
      }
    </Rnd>
  )
}
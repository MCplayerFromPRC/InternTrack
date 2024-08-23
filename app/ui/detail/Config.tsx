'use client'
import React from "react";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { Button } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Display } from "./Display"
import './code-module.scss';
import { INodeInfo } from "./Display";
import { Table } from 'antd';
export const columns = [
  {
    title: '数据集',
    dataIndex: 'dataset',
    key: 'dataset',
  },
  {
    title: '数据集子集',
    dataIndex: 'subDataset',
    key: 'subDataset',
  },
  {
    title: '评分',
    dataIndex: 'rate',
    key: 'rate',
  },
];
export default function DetailCard({ onclickFuncs, queue, tableRes, cardType }: {
  onclickFuncs: CallableFunction,
  queue: INodeInfo[],
  tableRes?: any,
  cardType: string
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
        topLeft: (queue[0] || tableRes.length) ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs(0)}><XCircleIcon className="h-10 w-10" /></Button>) : undefined,
        topRight: queue[1] ? (<Button className="transform -translate-x-1/4 -translate-y-1/4" onClick={() => onclickFuncs(1)}><XCircleIcon className="h-10 w-10" /></Button>) : undefined,
      }}
    // onResize={(ref: any) => {
    //   setSize({
    //     width: ref.style.width,
    //     height: ref.style.height,
    //   });
    // }}
    >
      {
        cardType === 'config' && <Display queue={queue} width={size.width} height={size.height} />
      }
      {
        cardType === 'result' && <Table dataSource={tableRes} columns={columns} pagination={false} />
      }
    </Rnd>
  );
}

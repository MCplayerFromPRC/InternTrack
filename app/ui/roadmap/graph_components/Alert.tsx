'use client'
import React from 'react';
import { WarningIcon } from "@/app/ui/svg-icon";
import { Button } from '@headlessui/react'
import { IWarningInfo } from '../../../dashboard/roadmap/graph_component';

const AlertMessage = ({ info, graphRef }: { info: IWarningInfo, graphRef: any }) => {
  const locateNode = async () => {
    console.log('locate node -----', info.id);
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.focusNodeById(info.id);
    await graphInstance.toggleAutoLayout();
    await graphInstance.moveToCenter();
    // await graphInstance.zoomToFit();
  };

  return (
    <div className="flex flex-col gap-2 w-full mb-2 p-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800">
      <div>
        节点ID：{info.id}
        {/* <span className="pl-4">{info.taskId ? `taskID:${info.taskId}` : ''}</span> */}
      </div>
      <div className="flex items-center justify-between" role="alert">
        <div className="flex items-center">
          <WarningIcon />
          <span className="flex">{info.message || "Loading..."}</span>
        </div>
        <div className="flex shrink-0">
          <Button
            className="rounded bg-amber-100 py-2 px-4 text-sm data-[hover]:bg-amber-200 data-[active]:bg-amber-300"
            onClick={locateNode}
          >
            <span className="flex text-yellow-800 hover:text-white active:text-amber-500">定位</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;

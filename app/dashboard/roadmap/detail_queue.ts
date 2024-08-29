import { INodeInfo } from "@/app/ui/detail/Display";
import { useEffect, useState } from "react";
import { message } from "antd";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SpecialQueue<T> = {
  enqueue: (nodeId: string, item: string) => void;
  dequeue: (idx: number) => void;
  isEmpty: boolean;
  queue: INodeInfo[];
};

function useSpecialQueue<T>(): SpecialQueue<T> {
  const [queue, setQueue] = useState<INodeInfo[]>([]);

  const [isEmpty, setIsEmpty] = useState(queue.length === 0);

  const enqueue = (nodeId: string, item: string) => {
    const nodeInfo: INodeInfo = {
      name: nodeId,
      config: item,
    };
    const tempArr = [...queue];
    const len = tempArr.length;
    // 处理queue
    // 如果nodeId，且nodeid已经存在列表里了，直接return
    const existingItem = queue.find((item) => item.name === nodeId);
    if (existingItem) {
      message.warning(`${nodeId} already exists in queue.`);
      return;
    }
    // queue为空，或者length<2且前面一项的type相同，直接push
    if (!tempArr.length || tempArr.length < 2) {
      tempArr.push(nodeInfo);
      setQueue(tempArr);
      return;
    }
    // 如果已有两项，替换后面那一项
    if (tempArr.length === 2 && nodeId !== queue?.[len - 1]?.name) {
      tempArr.splice(len - 1, 1, nodeInfo);
      setQueue(tempArr);
    }
  };

  const dequeue = (idx: number) => {
    if (idx < 0 || idx >= queue.length) {
      console.error(`Invalid index ${idx}, cannot dequeue.`);
      return;
    }
    const newQueue = [...queue.slice(0, idx), ...queue.slice(idx + 1)];
    console.log("dequeue-----", idx, newQueue);
    // const tempArr = [...queue].splice(idx, 1);
    setQueue(newQueue);
  };

  useEffect(() => {
    setIsEmpty(queue?.length === 0);
  }, [queue]);

  return {
    enqueue,
    dequeue,
    isEmpty,
    queue,
  };
}

export default useSpecialQueue;

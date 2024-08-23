import { INodeInfo } from "@/app/ui/detail/Display";
import { useEffect, useState } from "react";

type SpecialQueue<T> = {
  enqueue: (nodeId: string, item: string) => void;
  dequeue: (idx: number) => void;
  isEmpty: boolean;
  queue: (INodeInfo)[];
};

function useSpecialQueue<T>(): SpecialQueue<T> {
  const [queue, setQueue] = useState<(INodeInfo)[]>([]);

  const [isEmpty, setIsEmpty] = useState(queue.length === 0);

  const enqueue = (nodeId: string, item: string) => {
    const nodeInfo: INodeInfo = {
      name: nodeId,
      config: item
    }
    const tempArr = [...queue];
    const len = tempArr.length;
    // 处理queue
    // 如果nodeId，type都和queue的最后一项相同，直接return
    if (nodeId === queue?.[len - 1]?.name) {
      return;
    }
    // queue为空，或者length<2且前面一项的type相同，直接push
    if (!tempArr.length || (tempArr.length < 2)) {
      tempArr.push(nodeInfo);
      setQueue(tempArr);
      return;
    }
    // 如果已有两项，替换后面那一项
    // if (tempArr.length === 2) {

    // }
  };

  const dequeue = (idx: number) => {
    const tempArr = [...queue].slice(idx, 1);
    setQueue(tempArr)
  };

  useEffect(() => {
    setIsEmpty(queue[0] === null && queue[1] === null);
  }, [queue]);

  return {
    enqueue,
    dequeue,
    isEmpty,
    queue
  };
}

export default useSpecialQueue;

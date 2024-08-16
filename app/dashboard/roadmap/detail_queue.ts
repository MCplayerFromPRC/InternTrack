import { useState } from "react";

type SpecialQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: [(index: 0) => T | null, (index: 1) => T | null];
  isEmpty: boolean;
  queue: (T | null)[];
};

function useSpecialQueue<T>(): SpecialQueue<T> {
  const [queue, setQueue] = useState<(T | null)[]>([null, null]);

  const isEmpty = queue[0] === null && queue[1] === null;

  const enqueue = (item: T) => {
    setQueue((prevQueue) => {
      if (prevQueue[0] === null) {
        return [item, null];
      } else if (prevQueue[1] === null) {
        return [prevQueue[0], item];
      } else {
        return [prevQueue[1], item];
      }
    });
  };

  const dequeue0 = (): T | null => {
    let item: T | null = null;
    setQueue((prevQueue) => {
      item = prevQueue[0];
      if (prevQueue[1] !== null) {
        return [prevQueue[1], null];
      } else {
        return [null, null];
      }
    });
    return item;
  };

  const dequeue1 = (): T | null => {
    let item: T | null = null;
    setQueue((prevQueue) => {
      item = prevQueue[1];
      return [prevQueue[0], null];
    });
    return item;
  };

  return {
    enqueue,
    dequeue: [dequeue0, dequeue1],
    isEmpty,
    queue,
  };
}

export default useSpecialQueue;

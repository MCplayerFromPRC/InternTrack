import type { MutableRefObject } from "react";
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import type {
  RGJsonData,
  RGLink,
  RGNodeSlotProps,
  RGOptions,
  RelationGraphExpose,
} from "relation-graph/react";
import RelationGraph, { RGNode } from "relation-graph/react";

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  if (node.id === "current") {
    return (
      <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 text-black">
        {node.text}
      </div>
    );
  }
  return (
    <div className="w-full h-full text-center border border-gray-400 text-black rounded-full">
      {node.text}
    </div>
  );
};
const RGClock: React.FC = () => {
  const seeksRelationGraph$ = useRef() as MutableRefObject<RelationGraphExpose>;

  const onNodeClick = useCallback(
    (node: RGNode, _e: MouseEvent | TouchEvent) => {
      console.log("onNodeClick", node.id, node.text);
      return false; // Both true and false are acceptable. No impact.
    },
    [],
  ); // 由于这个函数不依赖于组件的state或props，所以依赖数组为空

  const play = useCallback((targetNodeNumber: number) => {
    if (targetNodeNumber > 60) targetNodeNumber = 1;
    if (seeksRelationGraph$.current) {
      const gInstance = seeksRelationGraph$.current.getInstance();
      const targetNode = gInstance.getNodeById(targetNodeNumber.toString());
      const focusNode = gInstance.getNodeById("current");
      focusNode.x = targetNode.x;
      focusNode.y = targetNode.y;
      gInstance.options.checkedNodeId = "current";
      gInstance.options.checkedLineId = gInstance
        .getLinks()
        .find((l: RGLink) => l.toNode.id === targetNode.id)?.relations[0].id;
      console.log(gInstance.options.checkedLineId);
      gInstance.dataUpdated();
      setTimeout(() => {
        play(targetNodeNumber + 1);
      }, 1000);
    }
  }, []); // 因为这个函数依赖于ref，所以可以保留依赖数组为空

  useEffect(() => {
    const graphJsonData: RGJsonData = {
      rootId: "root",
      nodes: [
        { id: "root", text: "" },
        { id: "current", text: "" },
        ...Array.from({ length: 60 }, (_, i) => ({
          id: (i + 1).toString(),
          text: (i + 1).toString(),
        })),
      ],
      lines: Array.from({ length: 60 }, (_, i) => ({
        from: "root",
        to: (i + 1).toString(),
      })),
    };
    seeksRelationGraph$.current.setJsonData(graphJsonData, true, () => {
      play(1);
    });
  }, [play]); // 将play函数作为依赖项

  const options: RGOptions = {
    showDebugPanel: true,
    lineUseTextPath: true,
    defaultLineShape: 1,
    placeSingleNode: false,
    moveToCenterWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    layouts: [
      {
        layoutName: "center",
      },
    ],
    defaultNodeWidth: 40,
    defaultNodeHeight: 40,
    defaultNodeBorderWidth: 0,
    defaultNodeColor: "transparent",
    defaultLineColor: "rgba(227,226,226,0.3)",
  };

  return (
    <div>
      <div style={{ height: 600, width: 900, border: "#efefef solid 1px" }}>
        <RelationGraph
          ref={seeksRelationGraph$}
          options={options}
          onNodeClick={onNodeClick}
          nodeSlot={NodeSlot}
        />
      </div>
    </div>
  );
};

export default RGClock;

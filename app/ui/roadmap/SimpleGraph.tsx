'use client'

import * as React from "react";
import { RefObject } from "react";
import type {
  RGLine,
  RGLink,
  RGNode,
  RGNodeSlotProps,
  RGOptions,
  RelationGraphComponent,
} from "relation-graph-react";
import RelationGraph, { RGMiniView } from "relation-graph-react";
import Panel from "./graph_components/Panel";

const getNodeStyle: React.CSSProperties = {
  zIndex: 555,
  opacity: 0.5,
  lineHeight: "100px",
  width: "100px",
  height: "100px",
  color: "#000000",
  borderRadius: "50%",
  boxSizing: "border-box",
  fontSize: "18px",
  textAlign: "center",
  overflow: "hidden",
};

const getInnerDivStyle = (percent: number): React.CSSProperties => ({
  width: "100%",
  height: `${percent * 100}%`,
  marginTop: `${(1 - percent) * 100}%`,
  background: "linear-gradient(to bottom, #00FFFF, #FF00FF)",
});

const defaultNodeStyle: React.CSSProperties = {
  lineHeight: "80px",
  textAlign: "center",
};

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  console.log("NodeSlot:");
  if (!node.lot.parent) {
    // if rootNode
    return (
      <div style={getNodeStyle}>
        <div style={getInnerDivStyle(node.data!.percent)}>{node.text}</div>
      </div>
    );
  }
  return (
    <div style={defaultNodeStyle}>
      <span>{node.text}</span>
    </div>
  );
};

const onLineClick = (
  line: RGLine,
  _link: RGLink,
  _e: MouseEvent | TouchEvent,
) => {
  console.log("onLineClick:", line.text, line.from, line.to);
  return true;
};

const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
  console.log("onNodeClick:", node.text);
  return true;
};

const options: RGOptions = {
  debug: true,
  defaultNodeBorderWidth: 0,
  defaultNodeColor: "rgba(238, 178, 94, 1)",
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultLineShape: 1,
  layouts: [
    {
      layoutName: "center",
      maxLayoutTimes: 3000,
    },
  ],
  defaultJunctionPoint: "border",
  defaultExpandHolderPosition: "right",
};

export const SimpleGraph = ({
  graphRef,
  onPanelClick,
}: {
  graphRef: RefObject<RelationGraphComponent>,
  onPanelClick: CallableFunction,
}) => {

  return (
    <div>
      <div
        style={{ height: "85dvh", width: "90%", border: "#efefef solid 1px" }}
      >
        <RelationGraph
          ref={graphRef}
          options={options}
          nodeSlot={NodeSlot}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          graphPlugSlot={
            <React.Fragment>
              <Panel onSearchClick={onPanelClick} ></Panel>
              <RGMiniView width="18%" height="20%" position="tr" />
            </React.Fragment>
          }
        ></RelationGraph>
      </div>
    </div>
  );
};

export default SimpleGraph;

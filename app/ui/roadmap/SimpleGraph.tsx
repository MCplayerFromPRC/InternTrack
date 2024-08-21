"use client";

import * as React from "react";
import { RefObject, PropsWithChildren } from "react";
import type {
  RGLine,
  RGLink,
  RGNode,
  RGNodeSlotProps,
  RGOptionsFull,
  RelationGraphComponent,
} from "relation-graph-react";
import RelationGraph, { RGMiniView } from "relation-graph-react";
import Panel from "./graph_components/Panel";
import MyToolbar from "./graph_components/ToolBar";
// import DetailCard from "../detail/Config"

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
  if (node.data!.type === "config") {
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

/* eslint-disable @typescript-eslint/no-unused-vars */
const onLineClick = (
  line: RGLine,
  _link: RGLink,
  _e: MouseEvent | TouchEvent,
) => {
  console.log("onLineClick:", line.text, line.from, line.to);
  return true;
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const options: Partial<RGOptionsFull> = {
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

export const SimpleGraph: React.FC<
  PropsWithChildren<{
    graphRef: RefObject<RelationGraphComponent>;
    onPanelClick: CallableFunction;
    onNodeClickFn: CallableFunction;
  }>
> = ({ children, graphRef, onPanelClick, onNodeClickFn }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
    console.log("onNodeClick:", node.text);
    onNodeClickFn(node.text);
    return true;
  };

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
          toolBarSlot={<MyToolbar></MyToolbar>}
          // canvasPlugSlot={<DetailCard onclickFuncs={[()=>{}, ()=>{}]} children={["test1", "test2"]} />}
          // canvasPlugAboveSlot={<DetailCard onclickFuncs={[()=>{}, ()=>{}]} children={["test1", "test2"]} />}
          graphPlugSlot={
            <React.Fragment>
              <Panel onSearchClick={onPanelClick}></Panel>
              <RGMiniView width="18%" height="20%" position="tr" />
            </React.Fragment>
          }
        >
          {children}
        </RelationGraph>
      </div>
    </div>
  );
};

export default SimpleGraph;

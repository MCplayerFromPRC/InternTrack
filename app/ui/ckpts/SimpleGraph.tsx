'use client'

import * as React from "react";
import { useEffect, useRef } from "react";
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

const staticJsonData = {
  rootId: "2",
  nodes: [
    { id: "1", text: "节点-1", myicon: "el-icon-star-on" },
    {
      id: "2",
      text: "节点-2",
      myicon: "el-icon-setting",
      height: 100,
      width: 100,
    },
    { id: "3", text: "节点-3", myicon: "el-icon-setting" },
    { id: "4", text: "节点-4", myicon: "el-icon-star-on" },
    { id: "6", text: "节点-6", myicon: "el-icon-setting" },
    { id: "7", text: "节点-7", myicon: "el-icon-setting" },
    { id: "8", text: "节点-8", myicon: "el-icon-star-on" },
    { id: "9", text: "节点-9", myicon: "el-icon-headset" },
    { id: "71", text: "节点-71", myicon: "el-icon-headset" },
    { id: "72", text: "节点-72", myicon: "el-icon-s-tools" },
    { id: "73", text: "节点-73", myicon: "el-icon-star-on" },
    { id: "81", text: "节点-81", myicon: "el-icon-s-promotion" },
    { id: "82", text: "节点-82", myicon: "el-icon-s-promotion" },
    { id: "83", text: "节点-83", myicon: "el-icon-star-on" },
    { id: "84", text: "节点-84", myicon: "el-icon-s-promotion" },
    { id: "85", text: "节点-85", myicon: "el-icon-sunny" },
    { id: "91", text: "节点-91", myicon: "el-icon-sunny" },
    { id: "92", text: "节点-92", myicon: "el-icon-sunny" },
    { id: "5", text: "节点-5", myicon: "el-icon-sunny" },
    {
      id: "15",
      text: "节点-15",
      myicon: "el-icon-setting",
      height: 100,
      width: 100,
    },
    { id: "17", text: "节点-17", myicon: "el-icon-sunny" },
    { id: "18", text: "节点-18", myicon: "el-icon-sunny" },
  ],
  lines: [
    { from: "7", to: "71", text: "投资" },
    { from: "7", to: "72", text: "投资" },
    { from: "7", to: "73", text: "投资" },
    { from: "8", to: "81", text: "投资" },
    { from: "8", to: "82", text: "投资" },
    { from: "8", to: "83", text: "投资" },
    { from: "8", to: "84", text: "投资" },
    { from: "8", to: "85", text: "投资" },
    { from: "9", to: "91", text: "投资" },
    { from: "9", to: "92", text: "投资" },
    { from: "1", to: "2", text: "投资" },
    { from: "3", to: "1", text: "高管" },
    { from: "4", to: "2", text: "高管" },
    { from: "6", to: "2", text: "高管" },
    { from: "7", to: "2", text: "高管" },
    { from: "8", to: "2", text: "高管" },
    { from: "9", to: "2", text: "高管" },
    { from: "1", to: "5", text: "投资" },
    { from: "15", to: "17", text: "投资" },
    { from: "15", to: "18", text: "投资" },
    { from: "17", to: "18", text: "投资" },
  ],
};

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

const SimpleGraph: React.FC = () => {
  const graphRef = useRef<RelationGraphComponent>(null);

  useEffect(() => {
    showGraph();
  }, []); // 使用 useCallback 处理的函数作为依赖

  const showGraph = async () => {
    const graphInstance = graphRef.current!.getInstance();
    await graphInstance.setJsonData(staticJsonData);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

  const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
    console.log("onNodeClick:", node.text);
    return true;
  };

  const onLineClick = (
    line: RGLine,
    _link: RGLink,
    _e: MouseEvent | TouchEvent,
  ) => {
    console.log("onLineClick:", line.text, line.from, line.to);
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
              <Panel></Panel>
              <RGMiniView width="18%" height="20%" position="tr" />
            </React.Fragment>
          }
        ></RelationGraph>
      </div>
    </div>
  );
};

export default SimpleGraph;

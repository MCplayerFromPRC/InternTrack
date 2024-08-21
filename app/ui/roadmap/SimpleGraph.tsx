"use client";

import * as React from "react";
import { RefObject, PropsWithChildren } from "react";
import RelationGraph, {
  RGLine,
  RGNode,
  RGNodeSlotProps,
  RGOptionsFull,
  RelationGraphComponent,
  GraphToolBar,
  RGMiniView
} from "relation-graph-react";
import Panel from "./graph_components/Panel";
// import MyToolbar from "./graph_components/ToolBar";
import './node.scss';
// import './tree-distance.scss';
// import DetailCard from "../detail/Config"
import { IWarningInfo } from '../../dashboard/roadmap/graph_component';
const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  // console.log("NodeSlot:");
  if (node.type === "task") {
    return (
      <div className={node.borderColor === "#f90" ? "commonNode taskNode isDelivery" : "commonNode taskNode"}>
        <p className="bold">task</p>
        <span className="text">{node.text}</span>
      </div>
    );
  }
  return (
    <div className={node.borderColor === "#f90" ? "commonNode weightNode isDelivery" : "commonNode weightNode"}>
      <p className="bold">{node.type === "ckpt" ? 'ckpt' : 'config'}</p>
      <span className="text">{node.text}</span>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const onLineClick = (
  line: RGLine,
  // _link: RGLink,
  // _e: MouseEvent | TouchEvent,
) => {
  console.log("onLineClick:", line.text, line.from, line.to);
};
/* eslint-enable @typescript-eslint/no-unused-vars */
const options: Partial<RGOptionsFull> = {
  debug: false,
  disableDragNode: false,
  layout: {
    layoutName: 'tree',
    from: 'left',
    min_per_width: 500,
    max_per_width: 800,
    min_per_height: 100,
    max_per_height: undefined,
  },
  allowSwitchJunctionPoint: false,
  defaultNodeShape: 1,
  defaultNodeBorderWidth: 0,
  defaultPolyLineRadius: 15,
  defaultLineShape: 4,
  defaultLineColor: '#444',
  defaultNodeColor: 'rgba(244, 240, 250, 0)'
};

export const SimpleGraph: React.FC<PropsWithChildren<{
  warningList: IWarningInfo[],
  graphRef: RefObject<RelationGraphComponent>,
  onPanelClick: CallableFunction,
  onNodeClickFn: CallableFunction,
}>> = ({
  warningList,
  graphRef,
  onPanelClick,
  onNodeClickFn,
}) => {
    const onNodeClick = (node: RGNode) => {
      console.log("onNodeClick:", node.text);
      if (node.type === 'task') return;
      onNodeClickFn(String(node.id))
    };

    // https://www.relation-graph.com/#/demo/react?id=toolbar-buttons 自定义toolbar
    return (
      <div
        style={{ height: "85dvh", width: "90%", border: "#efefef solid 1px" }}
      >
        <RelationGraph
          ref={graphRef}
          options={options}
          nodeSlot={NodeSlot}
          onNodeClick={onNodeClick}
          onLineClick={onLineClick}
          toolBarSlot={<GraphToolBar />}
          graphPlugSlot={
            <React.Fragment>
              <Panel onSearchClick={onPanelClick} warningList={warningList} graphRef={graphRef} ></Panel>
              <RGMiniView width="18%" height="20%" position="tr" />
            </React.Fragment >
          }
        />
      </div >
    );
  };

export default SimpleGraph;

'use client'

import * as React from "react";
import { RefObject, PropsWithChildren } from "react";
import RelationGraph, {
  RGLine,
  RGLink,
  RGNode,
  RGNodeSlotProps,
  RGOptionsFull,
  RelationGraphComponent,
  GraphToolBar,
  RGMiniView
} from "relation-graph-react";
import Panel from "./graph_components/Panel";
import MyToolbar from "./graph_components/ToolBar";
import './node.scss';
// import './tree-distance.scss';
// import DetailCard from "../detail/Config"

const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
  // console.log("NodeSlot:");
  if (node.type === "config") {
    return (
      <div className="commonNode configNode">
        <p className="bold">config</p>
        <span>{node.text}</span>
      </div>
    );
  }
  return (
    <div className="commonNode weightNode">
      <p className="bold">ckpt</p>
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
};

const options: Partial<RGOptionsFull> = {
  debug: true,
  disableDragNode: false,
  layout: {
    layoutName: 'tree',
    from: 'left',
    layoutClassName: 'seeks-layout-center',
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
  graphRef: RefObject<RelationGraphComponent>,
  onPanelClick: CallableFunction,
  onNodeClickFn: CallableFunction,
}>> = ({
  graphRef,
  onPanelClick,
  onNodeClickFn,
}) => {
    const onNodeClick = (node: RGNode, _e: MouseEvent | TouchEvent) => {
      console.log("onNodeClick:", node.text);
      onNodeClickFn(node.text)
      return true;
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
          // canvasPlugSlot={<DetailCard onclickFuncs={[()=>{}, ()=>{}]} children={["test1", "test2"]} />}
          // canvasPlugAboveSlot={<DetailCard onclickFuncs={[()=>{}, ()=>{}]} children={["test1", "test2"]} />}
          graphPlugSlot={
            <React.Fragment>
              <Panel onSearchClick={onPanelClick} ></Panel>
              <RGMiniView width="18%" height="20%" position="tr" />
            </React.Fragment>
          }
        />
      </div>
    );
  };

export default SimpleGraph;
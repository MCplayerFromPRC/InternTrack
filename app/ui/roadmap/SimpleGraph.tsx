"use client";

import React, { useState, useRef } from "react";
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
import Upload from '../upload';
import { IWarningInfo } from '../../dashboard/roadmap/graph_component';

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
    const myPage = useRef<HTMLDivElement>(null);
    const [isShowNodeMenuPanel, setIsShowNodeMenuPanel] = useState(false);
    const [currentNode, setCurrentNode] = useState<RGNode | null>(null);
    const [nodeMenuPanelPosition, setNodeMenuPanelPosition] = useState({ x: 0, y: 0 });
    const [isShowUploadPanel, setIsShowUploadPanel] = useState(false);
    // 删除评测结果
    const delRes = (nodeId: string) => {
      console.log('del res----', nodeId);
    };

    const onNodeClick = (node: RGNode) => {
      console.log("onNodeClick:", node.text);
      // 点击task节点无反应
      if (node.type === 'task' || node.type === 'ckpt') return;
      onNodeClickFn(String(node.id))
    };

    const nodeSlotOver = (nodeObject: RGNode) => {
      console.log('nodeSlotOver:', nodeObject);
    };

    const nodeSlotOut = (nodeObject: RGNode) => {
      console.log('nodeSlotOut:', nodeObject);
    };

    const showNodeMenus = (nodeObject: RGNode, $event: React.MouseEvent<HTMLDivElement>) => {
      setCurrentNode(nodeObject);
      const _base_position = myPage.current?.getBoundingClientRect();
      console.log('showNodeMenus:', $event, $event.currentTarget.offsetWidth, _base_position);
      setIsShowNodeMenuPanel(true);
      setNodeMenuPanelPosition({
        x: $event.clientX - 20,
        y: $event.clientY - (_base_position?.y || 0) - 20
      });
    };

    const doAction = (actionName: string) => {
      console.log('action name-----', actionName);
      if (actionName === 'config') {
        onNodeClickFn(currentNode?.id);
      }
      if (actionName === 'result') {
        onNodeClickFn(currentNode?.id);
      }
      if (actionName === 'upload') {
        console.log('show upload panel');
        setIsShowUploadPanel(true);
      }
      if (actionName === 'delete') {
        delRes(currentNode?.id || '');
      }
      setIsShowNodeMenuPanel(false);
    };

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
        <div className={node.borderColor === "#f90" ? "commonNode weightNode isDelivery" : "commonNode weightNode"}
          onClick={(event) => showNodeMenus(node, event)}
          onContextMenu={(event) => showNodeMenus(node, event)}
          onMouseEnter={() => nodeSlotOver(node)}
          onMouseLeave={() => nodeSlotOut(node)}
        >
          <p className="bold">{node.type === "ckpt" ? 'ckpt' : 'config'}</p>
          <span className="text">{node.text}</span>
        </div>
      );
    };

    // https://www.relation-graph.com/#/demo/react?id=toolbar-buttons 自定义toolbar
    return (
      <div
        ref={myPage}
        onClick={() => setIsShowNodeMenuPanel(false)}
        style={{ height: "85dvh", width: "100%", border: "#efefef solid 1px" }}
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
              <Panel onSearchClick={onPanelClick} warningList={warningList} graphRef={graphRef} />
              {/* <RGMiniView width="18%" height="20%" position="tr" /> */}
              <RGMiniView width="300px" height="150px" position="tr" />
            </React.Fragment >
          }
        />
        {/* ckpt节点的点击菜单 */}
        {isShowNodeMenuPanel && (
          <div
            className="c-nodes-menu-panel"
            style={{
              left: nodeMenuPanelPosition.x + 'px',
              top: nodeMenuPanelPosition.y + 'px',
            }}
          >
            <div className="c-node-menu-item-name">节点ID：{currentNode?.id}</div>
            <div className="c-node-menu-item" onClick={() => doAction('config')}>
              训练配置
            </div>
            <div className="c-node-menu-item" onClick={() => doAction('result')}>
              评测结果
            </div>
            <div className="c-node-menu-item" onClick={() => doAction('upload')}>
              上传csv
            </div>
            <div className="c-node-menu-item" onClick={() => doAction('delete')}>
              删除评测结果
            </div>
          </div>
        )}
        {/* 上传panel */}
        {
          isShowUploadPanel && <Upload />
        }
      </div >
    );
  };

export default SimpleGraph;

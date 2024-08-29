"use client";

import { useContext, useEffect, useState } from "react";
import { RelationGraphStoreContext } from "relation-graph-react";

// https://heroicons.com/
const MyToolbar = (props: any) => {
  const { changeViewType } = props;
  const graphInstance = useContext(RelationGraphStoreContext);
  const [options, setOptions] = useState(graphInstance.options);
  const [viewType, setViewType] = useState("ckpt");

  const refresh = () => {
    graphInstance.refresh();
  };

  const switchLayout = () => {
    const newType = viewType === "ckpt" ? "config" : "ckpt";
    setViewType(newType);
    changeViewType(newType);
    console.log("change layout:", newType);
  };

  // const toggleAutoLayout = () => {
  //   graphInstance.toggleAutoLayout();
  // };

  const downloadAsImage = () => {
    graphInstance.downloadAsImage("png");
  };

  // const zoomToFit = async () => {
  //   await graphInstance.setZoom(100);
  //   await graphInstance.moveToCenter();
  //   await graphInstance.zoomToFit();
  // };

  useEffect(() => {
    setOptions(graphInstance.options);
  }, [graphInstance.options]);

  return (
    <div
      className={`rel-toolbar rel-toolbar-h-${options.toolBarPositionH} rel-toolbar-v-${options.toolBarPositionV} rel-toolbar-${options.toolBarDirection}`}
    >
      <div
        className="c-mb-button mb-0"
        onClick={() => graphInstance.fullscreen()}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Fullscreen/Exit Fullscreen!"
        data-tooltip-place="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={() => graphInstance.zoom(20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom In"
        data-tooltip-place="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </div>
      {/* <div className="c-current-zoom" onDoubleClick={zoomToFit}>
        {options.canvasZoom}%
      </div> */}
      <div
        className="c-mb-button mb-0"
        onClick={() => graphInstance.zoom(-20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom Out"
        data-tooltip-place="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
          />
        </svg>
      </div>
      {/* <div
        className={`c-mb-button ${options.autoLayouting ? "c-mb-button-on" : ""}`}
        onClick={toggleAutoLayout}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={
          options.autoLayouting
            ? "Click to Stop Auto Layout"
            : "Click to Start Auto Layout"
        }
        data-tooltip-place="left"
      >
        {!options.autoLayouting ? (
          <svg className="rg-icon" aria-hidden="true">
            <use href="#icon-zidong"></use>
          </svg>
        ) : (
          <svg className="c-loading-icon rg-icon" aria-hidden="true">
            <use href="#icon-lianjiezhong"></use>
          </svg>
        )}
      </div> */}
      <div
        className="c-mb-button"
        onClick={refresh}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Refresh"
        data-tooltip-place="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={switchLayout}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="switch layout"
        data-tooltip-place="left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={downloadAsImage}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Download Image"
        data-tooltip-place="left"
      >
        {/* <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-tupian"></use>
        </svg> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default MyToolbar;

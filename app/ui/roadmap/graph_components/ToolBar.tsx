'use client'

import { useContext } from "react";
import { RelationGraphStoreContext } from "relation-graph-react";

// https://heroicons.com/
const MyToolbar = () => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance.options;

  const refresh = () => {
    graphInstance.refresh();
  };

  //eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const switchLayout = (layoutConfig: any) => {
    console.log("change layout:", layoutConfig);
    graphInstance.switchLayout(layoutConfig);
  };

  const toggleAutoLayout = () => {
    graphInstance.toggleAutoLayout();
  };

  const downloadAsImage = () => {
    graphInstance.downloadAsImage("png");
  };

  const zoomToFit = async () => {
    await graphInstance.setZoom(100);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  };

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={() => graphInstance.zoom(20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom In"
        data-tooltip-place="left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>

      </div>
      <div className="c-current-zoom" onDoubleClick={zoomToFit}>
        {options.canvasZoom}%
      </div>
      <div
        className="c-mb-button mb-0"
        onClick={() => graphInstance.zoom(-20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom Out"
        data-tooltip-place="left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
        </svg>
      </div>
      <div
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
      </div>
      <div
        className="c-mb-button"
        onClick={refresh}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Refresh"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-ico_reset"></use>
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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>

      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default MyToolbar;

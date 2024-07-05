import { useContext } from "react";
import { RelationGraphStoreContext } from "relation-graph-react";

const VipToolbarTooltipsMyToolbar = () => {
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
        <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-resize-"></use>
        </svg>
      </div>
      <div
        className="c-mb-button"
        onClick={() => graphInstance.zoom(20)}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Zoom In"
        data-tooltip-place="left"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-fangda"></use>
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
        <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-suoxiao"></use>
        </svg>
      </div>
      {options.isNeedShowAutoLayoutButton && (
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
      )}
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
        <svg className="rg-icon" aria-hidden="true">
          <use href="#icon-tupian"></use>
        </svg>
      </div>
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default VipToolbarTooltipsMyToolbar;

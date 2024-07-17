'use client'

import {
  ChevronUpIcon, ChevronDownIcon
} from '@heroicons/react/16/solid';
import { Button } from '@headlessui/react'
import * as React from "react";
import { PropsWithChildren, useState } from "react";
import AlertMessage from "./Alert";
import SearchBox from "./SearchBox";
import "./style.scss";

declare module "react" {
  interface CSSProperties {
    "--my-panel-width"?: string;
    "--my-panel-top"?: string;
    "--my-body-top"?: string;
  }
}

const Panel: React.FC<
  PropsWithChildren<{
    width?: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  }> & { onSearchClick: CallableFunction }
> = ({
  width = "400px",
  left = "10px",
  right = "",
  top = "10px",
  bottom = "10px",
  onSearchClick
}) => {
  const [closed, setClosed] = useState(false);
  const togglePanel = () => {
    setClosed(!closed);
  };

  const panelClasses = `c-my-demo-panel ${closed ? "c-my-demo-panel-closed" : ""} ${right ? "c-my-demo-panel-r" : ""}`;
  const iconClasses = `my-icon ${closed ? "my-icon-close" : "my-icon-open"}`;
  const searchBoxClasses = `my-search-box ${closed ? "my-search-box-close" : "my-search-box-open"}`;

  return (
    <div
      className={panelClasses}
      style={{
        "--my-panel-width": width,
        "--my-panel-top": top,
        left: right ? undefined : left,
        right: right || undefined,
      }}
    >
      <div className="my-footer">
        <SearchBox className={searchBoxClasses} onClick={onSearchClick} ></SearchBox>
        <Button className={`${iconClasses}`} onClick={togglePanel}>
          {closed ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      </div>
      <div className="my-body" style={{ "--my-body-top": bottom }}>
        <AlertMessage></AlertMessage>
      </div>
    </div>
  );
};

export default Panel;

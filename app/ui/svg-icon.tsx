import React, { LegacyRef } from "react";

const CallSplitIcon = React.forwardRef(
  (props, ref: LegacyRef<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      ref={ref}
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z" />
    </svg>
  ),
);

const WarningIcon = React.forwardRef((props, ref: LegacyRef<SVGSVGElement>) => (
  <svg
    className="flex-shrink-0 inline w-4 h-4 me-3"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  </svg>
));

const SearchIcon = React.forwardRef((props, ref: LegacyRef<SVGSVGElement>) => (
  <svg
    className="w-4 h-4 text-gray-500 dark:text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>
));

CallSplitIcon.displayName = "CallSplitIcon";
WarningIcon.displayName = "WarningIcon";
SearchIcon.displayName = "SearchIcon";

export { CallSplitIcon, WarningIcon, SearchIcon };

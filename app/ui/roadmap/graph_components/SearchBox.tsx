import * as React from "react";
import { PropsWithChildren, useState } from "react";

import { SearchIcon } from "@/app/ui/svg-icon";

const SearchBox: React.FC<
  PropsWithChildren<{
    children?: string;
    className?: string;
  }> & { onClick: CallableFunction }
> = ({ children, className = "my-search-box", onClick }) => {
  const [keyword, setKeyword] = useState<string>(children || "");

  return (
    <div className={`${className} max-w-md flex flex-col gap-2`}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
          </div>
          <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
          />
          <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => onClick(keyword)}
          >
              Search
          </button>
      </div>
      {children}
  </div>
  );
};

export default SearchBox;
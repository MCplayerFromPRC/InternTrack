import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import * as React from "react";
import { PropsWithChildren, useState } from "react";

const SearchBox: React.FC<
  PropsWithChildren<{
    children?: string;
    className?: string;
  }>
> = ({ children, className = "my-search-box" }) => {
  const [keyword, setKeyword] = useState<string>(children || "");

  const searchData = async (keyword: string) => {
    try {
      const response = await fetch(`https://api.example.com/data/${keyword}`);
      return await response.json();
    } catch (error) {
      console.error("Error searching data: ", error);
    }
  };

  return (
    <Box className={`${className} flex flex-col gap-2`}>
      <Input
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        startDecorator={
          <IconButton className="absolute left-0 inset-y-0 flex items-center pl-3">
            <SearchOutlinedIcon className="h-5 w-5 text-gray-500" />
          </IconButton>
        }
        placeholder="Search"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        endDecorator={
          <IconButton
            className="absolute right-0 inset-y-0 flex items-center pr-3"
            onClick={() => searchData(keyword)}
          >
            <VisibilityRoundedIcon className="h-5 w-5 text-gray-500" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default SearchBox;
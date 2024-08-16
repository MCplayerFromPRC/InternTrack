"use client";

import { WarningIcon } from "@/app/ui/svg-icon";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";

const AlertMessage: React.FC = () => {
  const [curMsg, setCurMsg] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const json = await response.json();
      setCurMsg(json.message);
    } catch (error) {
      console.error("Error fetching alert data: ", error);
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch("https://api.example.com/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: curMsg }),
      });
      const json = await response.json();
      setCurMsg(json.updatedMessage);
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex items-center p-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 justify-between"
        role="alert"
      >
        <div className="flex items-center">
          <WarningIcon />
          <span className="sr-only">Info</span>
          <span className="flex">{curMsg || "Loading..."}</span>
        </div>
        <div className="flex">
          <Button
            className="rounded bg-transparent py-2 px-4 text-sm data-[hover]:bg-amber-300 data-[active]:bg-amber-500"
            onClick={updateData}
          >
            <span className="flex text-yellow-800 hover:text-white active:text-amber-500">
              Modify
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;

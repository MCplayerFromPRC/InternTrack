import WarningIcon from "@mui/icons-material/Warning";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
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
    <Box className="flex flex-col gap-2 w-full">
      <Alert
        startDecorator={<WarningIcon />}
        variant="outlined"
        color="danger"
        endDecorator={
          <Button
            variant="plain"
            color="danger"
            className="mr-1"
            onClick={updateData}
          >
            Modify
          </Button>
        }
      >
        {curMsg || "Loading..."}
      </Alert>
    </Box>
  );
};

export default AlertMessage;

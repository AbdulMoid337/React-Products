import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className=" h-full w-full flex justify-center items-center ">
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
    </div>
  );
};

export default Loader;

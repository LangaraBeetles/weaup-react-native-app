import Stack from "@root/src/components/ui/Stack";
import { theme } from "@root/src/styles/theme";
import Start from "@src/components/setup/Start";
import { useState } from "react";

const setupPages = () => {
  const [showPage, setShowPage] = useState("start");

  return (
    <Stack h={"100%"} backgroundColor={theme.colors.other[300]}>
      {showPage === "start" && <Start changePage={setShowPage} />}
    </Stack>
  );
};

export default setupPages;

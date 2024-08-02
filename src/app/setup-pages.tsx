import Stack from "@root/src/components/ui/Stack";
import { theme } from "@root/src/styles/theme";
import Start from "@src/components/setup/Start";
import EarbudsTraining from "@src/components/setup/EarbudsTraining";
import EnableNotifications from "@src/components/setup/EnableNotifications";
import { useState } from "react";
import SetupGoal from "../components/setup/SetupGoal";

const setupPages = () => {
  const [showPage, setShowPage] = useState("start");
  const [backGround, setBackGround] = useState(theme.colors.white);

  return (
    <Stack h={"100%"} backgroundColor={backGround}>
      {showPage === "start" && (
        <Start changePage={setShowPage} setBackGround={setBackGround} />
      )}
      {showPage === "earbudsTraining" && (
        <EarbudsTraining changePage={setShowPage} />
      )}
      {showPage === "notifications" && (
        <EnableNotifications changePage={setShowPage} />
      )}
      {showPage === "setupGoal" && <SetupGoal changePage={setShowPage} />}
    </Stack>
  );
};

export default setupPages;

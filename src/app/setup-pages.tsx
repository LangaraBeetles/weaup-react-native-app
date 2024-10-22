import Stack from "@root/src/components/ui/Stack";
import { theme } from "@root/src/styles/theme";
import Start from "@src/components/setup/Start";
import EarbudsTraining from "@src/components/setup/EarbudsTraining";
import EnableNotifications from "@src/components/setup/EnableNotifications";
import { useState } from "react";
import SetupGoal from "../components/setup/SetupGoal";
import SetGoalSlider from "../components/setup/SetGoalSlider";
import SignUp from "../components/setup/SignUp";
import Welcome from "../components/setup/Welcome";
import SelectMode from "@src/components/setup/SelectMode";

const setupPages = () => {
  const [showPage, setShowPage] = useState("start");
  const [backGround, setBackGround] = useState(theme.colors.white);

  return (
    <Stack h={"100%"} backgroundColor={backGround}>
      {showPage === "start" && (
        <Start changePage={setShowPage} setBackGround={setBackGround} />
      )}
      {showPage === "selectMode" && <SelectMode changePage={setShowPage} />}
      {showPage === "earbudsTraining" && (
        <EarbudsTraining changePage={setShowPage} />
      )}
      {showPage === "notifications" && (
        <EnableNotifications changePage={setShowPage} />
      )}
      {showPage === "setupGoal" && (
        <SetupGoal changePage={setShowPage} setBackGround={setBackGround} />
      )}
      {showPage === "setupGoalSlider" && (
        <SetGoalSlider changePage={setShowPage} />
      )}
      {showPage === "signup" && (
        <SignUp changePage={setShowPage} setBackGround={setBackGround} />
      )}
      {showPage === "welcome" && <Welcome />}
    </Stack>
  );
};

export default setupPages;

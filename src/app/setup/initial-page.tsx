import Gradient from "@root/src/components/ui/Gradient";
import { theme } from "@root/src/styles/theme";
import { router } from "expo-router";
import { useUser } from "@src/state/useUser";

const initialPage = () => {
  const completeSetup = useUser((state) => state.isSetupComplete);

  const navigate = () => {
    setTimeout(() => {
      if (completeSetup) {
        router.navigate("/");
      } else {
        router.navigate("/setup-pages");
      }
    }, 1000);
  };

  navigate();

  return (
    <Gradient
      color1={theme.colors.other[200]}
      color2={theme.colors.white}
      locations={[0, 1]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
      }}
    />
  );
};

export default initialPage;

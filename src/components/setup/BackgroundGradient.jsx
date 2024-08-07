import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";

const BackgroundGradient = () => {
  return (
    <>
      <Gradient
        color1={theme.colors.primary[300]}
        color2={theme.colors.white}
        locations={[0, 1]}
        style={{
          position: "absolute",
          top: -80,
          left: 0,
          right: 0,
          height: "60%",
          zIndex: -1,
        }}
      />
      <Gradient
        color2={theme.colors.primary[300]}
        color1={theme.colors.white}
        locations={[0, 1]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
        }}
      />
    </>
  );
};

export default BackgroundGradient;

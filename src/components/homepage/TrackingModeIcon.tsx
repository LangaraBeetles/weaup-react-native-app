import { useUser } from "@src/state/useUser";
import { Image, View } from "react-native";

const TrackingModeIcon = () => {
  const mode = useUser((state) => state.mode);

  if (mode === "earbuds") {
    return <Image source={require("../../../assets/img/earbuds.png")} />;
  }

  return (
    // TODO: change this to a different icon, or hide completely
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: "#D9D9D9",
      }}
    />
  );
};

export default TrackingModeIcon;

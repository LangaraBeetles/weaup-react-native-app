import { View, ViewStyle } from "react-native";

const Main: React.FC<{ children?: React.ReactNode; style?: ViewStyle }> = ({
  children,
  style,
}) => {
  return (
    <View
      style={{
        padding: 30,
        display: "flex",
        height: "100%",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default Main;

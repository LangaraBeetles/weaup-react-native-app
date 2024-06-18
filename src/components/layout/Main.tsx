import { View } from "react-native";

const Main: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <View
      style={{
        padding: 30,
        display: "flex",
        height: "100%",
      }}
    >
      {children}
    </View>
  );
};

export default Main;

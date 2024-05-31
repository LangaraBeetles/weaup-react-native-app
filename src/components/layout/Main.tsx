import { View } from "@gluestack-ui/themed";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View padding={30} display="flex" height="100%">
      {children}
    </View>
  );
};

export default Main;

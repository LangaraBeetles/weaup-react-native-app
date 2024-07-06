import { router } from "expo-router";
import { Pressable } from "react-native";
import Icon from "@src/components/ui/Icon";

const BackButton = () => {
  return (
    <Pressable onPress={router.back}>
      <Icon name="arrow-left" size={35} />
    </Pressable>
  );
};

export default BackButton;

import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@src/components/ui/Icon";
import { theme } from "@src/styles/theme";

const BackButton = ({ onBack }: { onBack?: () => void }) => {
  return (
    <TouchableOpacity onPress={onBack || router.back}>
      <View style={styles.iconBackground}>
        <Icon name="arrow-left" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackButton;

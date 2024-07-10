import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon, { IconName } from "@src/components/ui/Icon";
import { theme } from "@src/styles/theme";

const CloseButton = ({
  icon = "close",
  onClose,
}: {
  icon?: IconName;
  onClose: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onClose}>
      <View style={styles.iconBackground}>
        <Icon name={icon} size={20} color={theme.colors.neutral[800]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CloseButton;

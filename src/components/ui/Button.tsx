import { Text } from "@gluestack-ui/themed";
import { StyleSheet, TouchableHighlight } from "react-native";

const Button: React.FC<{ title: string; onPress?: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "gray",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
export default Button;

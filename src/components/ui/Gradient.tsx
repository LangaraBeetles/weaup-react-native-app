import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

interface GradientProps {
  color1: string;
  color2: string;
  locations?: number[]; // example: [0, 0.3]
}

const Gradient: React.FC<GradientProps> = ({
  color1,
  color2,
  locations = [0, 0.3],
}) => {
  return (
    <LinearGradient
      colors={[color1, color2]}
      locations={locations}
      style={styles.background}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "120%",
  },
});

export default Gradient;

import { Box } from "@gluestack-ui/themed";
import { Text } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import Slider from "@react-native-community/slider";

const AnalyticsScreen = () => {
  const animation = useRef<any>(null);

  return (
    <Box padding={30}>
      <Text>Analytics Page text</Text>

      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor="#D9D9D9"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => {
          animation.current.play(value, value + 1);

          if (value > 15) {
            animation.current.play(15, 50);
          }
        }}
      />
      <LottieView
        autoPlay={false}
        ref={animation}
        progress={1}
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require("../../animations/alien.json")}
      />
    </Box>
  );
};

export default AnalyticsScreen;

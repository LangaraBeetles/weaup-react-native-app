import { Dimensions, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { useState, useCallback } from "react";

import Icon1 from "assets/challenges/card/icon1.svg";
import Icon2 from "assets/challenges/card/icon2.svg";
import Icon3 from "assets/challenges/card/icon3.svg";

const dimensions = Dimensions.get("screen");

const ChallengeAvatarCarousel = ({
  width = dimensions.width,
  height,
}: {
  width?: number;
  height: number;
}) => {
  const [isFast, setIsFast] = useState(false);
  const itemSize = 50;
  const centerOffset = width / 2 - itemSize / 2;

  const animationStyle = useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [-30, -15, 0, 0, 0, 15, 30]
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [20, 20, 20, 20, 20]
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.8, 0.85, 1.1, 0.85, 0.8]
      );

      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          { scale },
        ],
      };
    },
    [centerOffset]
  );

  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    >
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: width,
          height: height,
        }}
        loop
        autoPlayInterval={isFast ? 100 : 2000}
        data={[...new Array(3).keys()]}
        renderItem={({ index }) => {
          let Icon = Icon2;

          if (index == 1) {
            Icon = Icon1;
          }
          if (index == 2) {
            Icon = Icon3;
          }
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                console.log(index);
              }}
              containerStyle={{ flex: 1 }}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  overflow: "hidden",
                  alignItems: "center",
                }}
              >
                <Icon
                  width="100%"
                  height="100%"
                  style={{ position: "absolute" }}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default ChallengeAvatarCarousel;

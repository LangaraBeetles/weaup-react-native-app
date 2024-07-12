import { Dimensions, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { useCallback } from "react";

import Icon1 from "assets/challenges/card/icon1.svg";
import Icon2 from "assets/challenges/card/icon2.svg";
import Icon3 from "assets/challenges/card/icon3.svg";
import { ChallengeIconType } from "@src/interfaces/challenge.types";

const dimensions = Dimensions.get("screen");

const ChallengeAvatarCarousel = ({
  width = dimensions.width,
  height,
  onChange,
}: {
  width?: number;
  height: number;
  onChange: (value: ChallengeIconType) => void;
}) => {
  const itemSize = 65;
  const centerOffset = width / 2 - itemSize / 2;

  const animationStyle = useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [-30, -15, 0, 0, 0, 15, 30],
      );

      const translateX =
        interpolate(value, [-0.9, 0, 0.9], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [20, 20, 20, 20, 20],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.7, 0.85, 1.3, 0.85, 0.7],
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
    [centerOffset],
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
        autoPlayInterval={2000}
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
        onSnapToItem={(index) => {
          onChange(`icon${index + 1}` as ChallengeIconType);
        }}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default ChallengeAvatarCarousel;

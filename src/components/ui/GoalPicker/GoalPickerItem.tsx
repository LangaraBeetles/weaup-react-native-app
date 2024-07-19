import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";

const GoalPickerItem = (props: {
  item: number;
  index: number;
  listItemWidth: number;
  contentOffset: SharedValue<number>;
}) => {
  const { item, index, listItemWidth, contentOffset } = props;

  const rStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * listItemWidth,
      (index - 1) * listItemWidth,
      index * listItemWidth,
      (index + 1) * listItemWidth,
      (index + 2) * listItemWidth,
    ];

    const opacityOutputRange = [0.2, 0.5, 1, 0.5, 0.2];

    const scaleOutputRange = [0.8, 1, 1.2, 1, 0.8];

    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          scale: scale,
        },
        {
          translateX: listItemWidth / 8,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          paddingTop: 24,
          width: listItemWidth,
        },
        rStyle,
      ]}
    >
      <View
        style={{
          width: listItemWidth - 24, //deducttion of 24 padding
          height: "85%",
          backgroundColor: theme.colors.primary[500],
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text level="title_3" style={styles.title_3}>
          {item}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title_3: {
    color: theme.colors.neutral[900],
  },
});

export default memo(GoalPickerItem);

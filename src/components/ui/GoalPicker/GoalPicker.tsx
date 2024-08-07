import { useEffect, useRef } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import GoalPickerItem from "@src/components/ui/GoalPicker/GoalPickerItem";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const data = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
const { width, height } = Dimensions.get("screen");
const listItemWidth = width / 5;

const GoalPicker = (props: {
  flex?: number;
  goal: number;
  setGoal: React.Dispatch<React.SetStateAction<number>>;
  source: "setup" | "profile"; // Add a new prop to determine the source page
}) => {
  const { flex, goal, setGoal, source } = props;
  const contentOffset = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const scaleIn = useSharedValue(0);

  useEffect(() => {
    scaleIn.value = withTiming(1, {
      duration: 600,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleIn.value }],
  }));

  return (
    <View
      style={{
        flex: flex ?? 1,
      }}
    >
      <Animated.View style={[scaleStyle]}>
        <Text
          level="body"
          align="center"
          style={{
            color: theme.colors.neutral[400],
            paddingHorizontal: 16,
            paddingBottom: height * 0.001,
          }}
        >
          A score setting of 70–85% of good{"\n"} posture is perfect for
          beginners.
        </Text>
      </Animated.View>
      <Animated.View style={[scaleStyle]}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          scrollEventThrottle={18}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={data.indexOf(goal)}
          initialNumToRender={1}
          getItemLayout={(_, index) => ({
            length: listItemWidth,
            offset: listItemWidth * index,
            index,
          })}
          onScroll={(event) => {
            const xPosition = event.nativeEvent.contentOffset.x;
            const newIndex = Math.round(xPosition / listItemWidth);
            contentOffset.value = xPosition;
            data[newIndex] && setGoal(data[newIndex]);
          }}
          contentContainerStyle={{
            height: source === "setup" ? 300 : "100%", // Use the source prop to set the height
            justifyContent: "center",
            alignItems: "center",
            paddingRight: listItemWidth * 2,
            paddingLeft: listItemWidth * 2,
          }}
          renderItem={({ item, index }) => {
            return (
              <GoalPickerItem
                item={item}
                index={index}
                contentOffset={contentOffset}
                listItemWidth={listItemWidth}
              />
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

export default GoalPicker;

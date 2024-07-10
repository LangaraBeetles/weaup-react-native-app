import { useRef } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Stack from "@src/components/ui/Stack";
import GoalPickerItem from "@src/components/ui/GoalPicker/GoalPickerItem";

const data = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
const { width } = Dimensions.get("screen");
const listItemWidth = width / 5;

const GoalPicker = (props: {
  flex?: number;
  goal: number;
  setGoal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { flex, goal, setGoal } = props;
  const contentOffset = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  return (
    <View
      style={{
        flex: flex ?? 1,
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        p={0}
      >
        <Text level="giant_title" style={styles.goal_text}>
          {goal}
        </Text>
        <Text level="large_title" style={styles.goal_text}>
          %
        </Text>
      </Stack>
      <Text
        level="body"
        align="center"
        style={{ color: theme.colors.neutral[400], paddingHorizontal: 16 }}
      >
        A score setting of 70–85% of good posture is perfect for beginners.
      </Text>
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
          height: "100%",
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
    </View>
  );
};

const styles = StyleSheet.create({
  goal_text: {
    color: theme.colors.secondary[600],
  },
});

export default GoalPicker;

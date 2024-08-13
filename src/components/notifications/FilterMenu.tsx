import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Tab = {
  label: string;
  value: string;
};

type FilterMenuProps = {
  tabs: Array<Tab>;
  defaultTab?: string;
  onChange?: (filter: string) => void;
};

const FilterMenu = ({ defaultTab, tabs, onChange }: FilterMenuProps) => {
  const [selectedFilter, setSelectedFilter] = useState(
    defaultTab ?? tabs?.[0].value,
  );
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const tabLayouts = useRef<{ [key: string]: { x: number; width: number } }>(
    {},
  );

  const handleTabLayout = (event: LayoutChangeEvent, value: string) => {
    const { x, width } = event.nativeEvent.layout;
    tabLayouts.current[value] = { x, width };

    if (value === selectedFilter) {
      indicatorPosition.value = withTiming(x, { duration: 300 });
      indicatorWidth.value = withTiming(width, { duration: 300 });
    }
  };

  useEffect(() => {
    const layout = tabLayouts.current[selectedFilter];
    if (layout) {
      indicatorPosition.value = withTiming(layout.x, { duration: 300 });
      indicatorWidth.value = withTiming(layout.width, { duration: 300 });
    }
  }, [selectedFilter]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
      {tabs.map(({ label, value }) => {
        return (
          <TouchableOpacity
            key={value}
            style={styles.filterButton}
            onPress={() => {
              setSelectedFilter(value);
              onChange?.(value);
            }}
            onLayout={(event) => handleTabLayout(event, value)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === value && styles.selectedText,
              ]}
              level="footnote"
              weight="semibold"
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary[50],
    padding: 4,
    borderRadius: 100,
    position: "relative",
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 100,
  },
  filterText: {
    color: "#5F5C56",
  },
  selectedText: {
    color: "#201F1D",
    fontFamily: "NunitoBold",
  },
  indicator: {
    position: "absolute",
    height: "100%",
    backgroundColor: theme.colors.primary[400],
    borderRadius: 100,
    top: 4,
    zIndex: -1,
  },
});

export default FilterMenu;

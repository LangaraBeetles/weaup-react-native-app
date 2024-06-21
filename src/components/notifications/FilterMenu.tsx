import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";

type FilterMenuProps = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
};

const FilterMenu = ({ selectedFilter, setSelectedFilter }: FilterMenuProps) => {
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "All" && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress("All")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "All" && styles.selectedText,
          ]}
          level="footnote"
          weight="semibold"
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "Summary" && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress("Summary")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "Summary" && styles.selectedText,
          ]}
          level="footnote"
          weight="semibold"
        >
          Summary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedFilter === "Challenge" && styles.selectedButton,
        ]}
        onPress={() => handleFilterPress("Challenge")}
      >
        <Text
          style={[
            styles.filterText,
            selectedFilter === "Challenge" && styles.selectedText,
          ]}
          level="footnote"
          weight="semibold"
        >
          Challenge
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FEE39A",
    paddingVertical: 3,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 3,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  filterText: {
    color: "#5F5C56",
  },
  selectedButton: {
    backgroundColor: "#FFF",
  },
  selectedText: {
    color: "#201F1D",
  },
});

export default FilterMenu;

import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";

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
    defaultTab ?? tabs?.[0].value
  );

  return (
    <View style={styles.container}>
      {tabs.map(({ label, value }) => {
        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.filterButton,
              selectedFilter === value && styles.selectedButton,
            ]}
            onPress={() => setSelectedFilter(value)}
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
    backgroundColor: "#FEE39A",
    padding: 4,
    borderRadius: 100,
    gap: 1,
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
  selectedButton: {
    backgroundColor: "#FFF",
  },
  selectedText: {
    color: "#201F1D",
    fontFamily: "NunitoBold",
  },
});

export default FilterMenu;

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";

const Page: React.FC<{
  children?: React.ReactNode | React.ReactNode[];
  header?: React.ReactNode | React.ReactNode[];
}> = ({ children, header }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.header}>
          <Text level="title_1">Analytics</Text>
          {header}
        </View>

        <View style={styles.mainCard}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    display: "flex",
    backgroundColor: theme.colors.primary[200],
    height: "100%",
  },
  body: {},
  header: {
    display: "flex",
    gap: 16,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
  mainCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#F9F9F9",
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: "100%",
    gap: 20,
  },
});

export default Page;

import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import BackButton from "@src/components/ui/BackButton";
import Stack from "@src/components/ui/Stack";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

type Children = React.ReactNode | React.ReactNode[];

const Page: React.FC<{
  backButtonShown?: boolean;
  title?: string;
  children?: Children;
  header?: Children;
  renderContainer?: (children: Children) => React.ReactNode;
  gradientProps?: LinearGradientProps;
}> = ({
  backButtonShown,
  title,
  children,
  header,
  gradientProps,
  renderContainer = (children) => children,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary[200], theme.colors.surface]}
        locations={[0, 0.8]}
        style={styles.gradient}
        {...gradientProps}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {renderContainer(
          <>
            <View style={styles.header}>
              <Stack flexDirection="row" gap={40}>
                {backButtonShown ? <BackButton /> : null}
                <Text level="title_2">{title}</Text>
              </Stack>
              {header}
            </View>

            <View style={styles.mainCard}>{children}</View>
          </>,
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
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
    backgroundColor: theme.colors.surface,
    paddingTop: 26,
    paddingHorizontal: 16,
    height: height,
    gap: 20,
    flex: 1,
  },
});

export default Page;

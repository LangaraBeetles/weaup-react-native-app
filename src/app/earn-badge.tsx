import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import Spacer from "@src/components/ui/Spacer";
import Button from "@src/components/ui/Button";
import { useRouter } from "expo-router";
import Badge from "@src/components/ui/Badge";

const EarnBadgeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#FDD462"]}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0.1199 }}
        style={StyleSheet.absoluteFill}
      />
      <Stack alignItems="center">
        <Text level="title_1">Congratulations!</Text>
        <Spacer height={411} />

        <View style={styles.message}>
          <Text level="footnote" align="center">
            You've aced your way to 1000 XP! Keep up the excellent work!
          </Text>
        </View>
      </Stack>
      <View style={styles.button}>
        <Button title="Collect Badge" onPress={router.back} />
      </View>
      <View style={styles.badge}>
        <Badge
          name="xp"
          title="1k"
          unlocked={true}
          subtitle="XP Champion"
          size="large"
        />
      </View>
    </View>
  );
};

export default EarnBadgeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 230,
    paddingTop: 37,
  },
  badge: {
    position: "absolute",
    top: 300,
    width: 200,
  },
  message: {
    width: 230,
  },
});

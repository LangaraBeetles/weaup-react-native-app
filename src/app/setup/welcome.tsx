import { router } from "expo-router";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = () => {
  setTimeout(() => {
    router.navigate("/");
  }, 1500);

  // TODO: change colours to theme colours

  const text = "Time to sit up straight and shine with\nWeaUP!";

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Stack h={height} w={width} style={{ flex: 1, alignItems: "center" }}>
        <Gradient
          color2={theme.colors.primary[300]}
          color1={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            top: -80,
            left: 0,
            right: 0,
            height: "60%",
            zIndex: -1,
          }}
        />
        <Gradient
          color1={theme.colors.primary[300]}
          color2={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 0,
          }}
        />
        <Stack gap={40} mt={height * 0.12}>
          <Stack w={353} h={338} style={{ position: "absolute", zIndex: 2 }}>
            <Image name="confeties" />
          </Stack>
          <Stack w={353} h={338} style={styles.window}>
            <Stack
              w={325}
              h={642}
              style={{
                marginHorizontal: "auto",
                marginTop: 60,
              }}
            >
              <Image name="weasel-happy" />
            </Stack>
          </Stack>
          <Center w={width * 0.85}>
            <Text
              align="center"
              level="title_1"
              style={{ color: theme.colors.primary[900], zIndex: 5 }}
            >
              {text}
            </Text>
          </Center>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  window: {
    backgroundColor: theme.colors.white,
    borderRadius: 230,
    overflow: "hidden",
  },
});

export default WelcomeScreen;

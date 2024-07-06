import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import WelcomeMascotImage from "assets/icons/welcome-mascot.svg";

const WelcomeScreen = () => {
  setTimeout(() => {
    router.navigate("/");
  }, 1500);

  // TODO: change colours to theme colours

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#F7B602",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack p={30}>
        <WelcomeMascotImage />
        <Text align="center" level="title_2" style={{ color: "#FFFFFF" }}>
          Time to sit up straight and shine with WeaUP!
        </Text>
      </Stack>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

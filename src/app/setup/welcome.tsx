import Main from "@src/components/layout/Main";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";

const WelcomeScreen = () => {
  //TODO: Create guest user

  setTimeout(() => {
    router.navigate("/");
  }, 3000);

  return (
    <SafeAreaView>
      <Main>
        <Text align="center">
          Time to sit up straight and shine with WeaUP!
        </Text>
      </Main>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

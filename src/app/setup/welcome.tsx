import Main from "@src/components/layout/Main";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text } from "@src/components/ui/typography";
import Icon from "@src/components/ui/Icon";
import Stack from "@src/components/ui/Stack";
import Center from "@src/components/ui/Center";

const WelcomeScreen = () => {
  //TODO: Create guest user

  setTimeout(() => {
    router.navigate("/");
  }, 3000);

  return (
    <SafeAreaView style={{ backgroundColor: "#F7B602" }}>
      <Main>
        <Center>
          <Stack>
            <Icon name={"welcome-mascot"} />
            <Text align="center">
              Time to sit up straight and shine with WeaUP!
            </Text>
          </Stack>
        </Center>
      </Main>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

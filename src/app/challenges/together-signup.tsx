import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";

import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Center from "@src/components/ui/Center";
import Icon, { IconName } from "@src/components/ui/Icon";
import GoogleButton from "@root/src/components/ui/GoogleButton";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const ListComponent = ({
  text,
  iconName,
}: {
  text: string;
  iconName: IconName;
}) => {
  return (
    <Stack flexDirection="row" gap={16}>
      <Stack
        backgroundColor={theme.colors.secondary[500]}
        p={6}
        borderRadius={8}
        h={36}
        w={36}
        justifyContent="center"
        alignItems="center"
      >
        <Icon name={iconName} />
      </Stack>
      <Stack flex={1} justifyContent="center">
        <Text level="callout">{text}</Text>
      </Stack>
    </Stack>
  );
};

const TogetherSignUp = () => {
  return (
    <SafeAreaView>
      <Stack gap={20} h={"100%"}>
        <Center pt={20}>
          <Text level="title_2">How Together Works</Text>
        </Center>

        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[theme.colors.primary[400], theme.colors.white]}
            locations={[0.1, 0.4]}
            style={{
              position: "absolute",
              zIndex: -1,
              width: width * 2,
              height: height * 2,
              borderRadius: width,
            }}
          />
        </View>
        <Center h={348} style={{ zIndex: -2, top: 10 }}>
          <Image name="weasel-happy" />
        </Center>

        <Stack
          gap={20}
          h={409}
          px={20}
          w={"100%"}
          style={{ position: "absolute", bottom: 20 }}
        >
          <Stack>
            <Text level="title_3" align="center">
              Improve your posture with your friends using WeaUp!
            </Text>
          </Stack>

          <Stack
            py={28}
            px={16}
            gap={24}
            backgroundColor={theme.colors.white}
            borderRadius={16}
          >
            <ListComponent
              text="Get Support and Stay Motivated Together"
              iconName="together-icon-1"
            />
            <ListComponent
              text="Join Exclusive Group Challenges"
              iconName="together-icon-2"
            />
            <ListComponent
              text="Earn Group Rewards"
              iconName="together-icon-3"
            />
          </Stack>
          <Stack alignItems="center">
            <Text level="headline">Unlimited free access!</Text>
          </Stack>
          <Stack>
            <GoogleButton signUp={true} />
          </Stack>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: height * 0.25,
    width: width * 2,
    height: height * 2,
    backgroundColor: theme.colors.primary[200],
    borderRadius: width,
    flexShrink: 0,
    alignSelf: "center",
  },
});

export default TogetherSignUp;

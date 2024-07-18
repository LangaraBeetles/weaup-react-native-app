import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";
import Center from "@src/components/ui/Center";
import Icon from "@src/components/ui/Icon";
import GoogleButton from "@root/src/components/ui/GoogleButton";

const { height } = Dimensions.get("window");

const TogetherSignUp = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Stack
        py={16}
        pt={Platform.OS === "android" ? height * 0.08 : 16}
        flex={1}
      >
        <Stack flexGrow={1}>
          <Center pb={37}>
            <Text style={styles.content} level="title_2">
              How Together Works
            </Text>
          </Center>

          <View style={styles.mainContainer} />
          <Stack
            flexGrow={0}
            alignItems="center"
            style={styles.paddedContent}
            justifyContent="space-between"
            gap={40}
            h={height * 0.72}
            pb={20}
          >
            <Stack w={"50%"} h={"20%"} gap={15} alignItems="center">
              <Image name="weasel-floating" />
              <Image name="elipse-shadow" height={"10%"} width={"70%"} />
            </Stack>
            <Text level="title_2" align="center">
              Improve your posture with your friends using WeaUp!
            </Text>

            <Stack
              p={16}
              gap={20}
              backgroundColor={theme.colors.white}
              w={"65%"}
              borderRadius={16}
            >
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="subhead">
                  Get Support and Stay Motivated Together
                </Text>
              </Stack>
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="subhead">Join Exclusive Group Challenges</Text>
              </Stack>
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="subhead">Earn Group Rewards</Text>
              </Stack>
            </Stack>

            <Text level="headline">Unlimited free access!</Text>

            <Text level="caption_2">Terms of Service and Privacy Policy </Text>
          </Stack>
          <View
            style={{
              paddingHorizontal: 40,
            }}
          >
            <GoogleButton title="Sign up with Google" />
          </View>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: height * 0.15,
    width: 865,
    height: 865,
    backgroundColor: theme.colors.primary[200],
    borderRadius: 865 / 2,
    flexShrink: 0,
    alignSelf: "center",
  },
  main: {
    height: "100%",
  },
  content: {
    flexGrow: 2,
    color: theme.colors.primary[900],
  },
  paddedContent: {
    paddingHorizontal: 26,
  },
  starList: {
    backgroundColor: theme.colors.secondary[500],
    borderRadius: 12,
    alignSelf: "center",
    padding: 6,
  },
});

export default TogetherSignUp;

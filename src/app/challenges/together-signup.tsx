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
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const TogetherSignUp = () => {
  return (
    <SafeAreaView style={styles.main}>
      <Stack
        py={16}
        px={10}
        pt={Platform.OS === "android" ? height * 0.08 : 16}
        flex={1}
      >
        <Stack flexGrow={1} gap={20}>
          <Center>
            <Text style={styles.content} level="title_2">
              How Together Works
            </Text>
          </Center>

          <View style={styles.mainContainer}>
            <LinearGradient
              colors={[theme.colors.primary[200], theme.colors.white]}
              locations={[0.2, 0.4]}
              style={{
                position: "absolute",
                zIndex: -1,
                width: width * 2,
                height: height * 2,
                borderRadius: width,
              }}
            />
          </View>

          <Stack
            flexGrow={0}
            alignItems="center"
            style={styles.paddedContent}
            justifyContent="space-between"
            gap={20}
            h={height * 0.7}
            pb={0}
          >
            <Stack w="50%" h={150} gap={15} alignItems="center">
              <Image name="weasel-floating" />
              <Image name="elipse-shadow" height={"10%"} width={"70%"} />
            </Stack>

            <Text level="title_3" align="center">
              Improve your posture with your friends using WeaUp!
            </Text>

            <Stack
              py={28}
              px={16}
              gap={20}
              backgroundColor={theme.colors.white}
              borderRadius={16}
            >
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="callout">
                  Get Support and Stay Motivated Together
                </Text>
              </Stack>
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="callout">Join Exclusive Group Challenges</Text>
              </Stack>
              <Stack flexDirection="row" gap={16}>
                <View style={styles.starList}>
                  <Icon name="star-outline" color={theme.colors.white} />
                </View>
                <Text level="callout">Earn Group Rewards</Text>
              </Stack>
            </Stack>

            <Text level="headline">Unlimited free access!</Text>
          </Stack>

          <GoogleButton signUp={true} />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: height * 0.15,
    width: width * 2,
    height: height * 2,
    backgroundColor: theme.colors.primary[200],
    borderRadius: width,
    flexShrink: 0,
    alignSelf: "center",
  },
  main: {
    // height: "50%",
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

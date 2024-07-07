import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import { useNavigation } from "@react-navigation/native";
import Stack from "@src/components/ui/Stack";
import { router } from "expo-router";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "@src/components/ui/typography";
import Gradient from "@src/components/ui/Gradient";
import { theme } from "@src/styles/theme";
import Image from "@src/components/ui/Image";

const { height, width } = Dimensions.get("screen");

const PhoneTrainingScreen = () => {
  const navigation = useNavigation();

  const next = () => {
    router.push("/setup/enable-notifications");
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <Stack
          style={{
            position: "absolute",
            top: Platform.OS === "android" ? height * 0.08 : height * 0.04,
            right: width * 0.07,
            zIndex: 2,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text level="headline" style={{ color: theme.colors.neutral[500] }}>
              Skip
            </Text>
          </TouchableOpacity>
        </Stack>
        <Gradient
          color1={theme.colors.primary[300]}
          color2={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 1,
          }}
        />
        <Gradient
          color2={theme.colors.primary[300]}
          color1={theme.colors.white}
          locations={[0, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            zIndex: 3,
          }}
        />
        <Center
          w={236}
          h={456}
          style={{
            marginHorizontal: "auto",
            marginTop: height * 0.15,
            zIndex: 2,
          }}
        >
          <Stack style={styles.phone} w={20} h={128} />
          <Image name="weasel-happy" />
        </Center>
        <Stack style={styles.content}>
          <Center
            justifyContent="center"
            height="100%"
            py={height * 0.04}
            px={20}
          >
            <Stack gap={32}>
              <Stack gap={16}>
                <Text
                  align="center"
                  level="title_1"
                  style={{ color: theme.colors.primary[900] }}
                >
                  Hold your phone
                </Text>
                <Text align="center">
                  Try hold it upright at 90 degree. This is your ideal posture!
                </Text>
              </Stack>
            </Stack>
          </Center>
        </Stack>
        <Stack style={{ zIndex: 5 }} flex={"row"}>
          <Stack w={40} h={8} style={styles.activeNav} />
        </Stack>
        <Stack style={styles.button} w={137}>
          <Button
            trailingIcon="chevron-right"
            onPress={next}
            variant="primary"
            title={""}
          />
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: Platform.OS === "android" ? height * 0.25 : height * 0.33,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
    zIndex: 4,
  },
  phone: {
    position: "absolute",
    top: 25,
    left: 0,
    borderRadius: 5,
    backgroundColor: theme.colors.other[100],
    transform: [{ rotate: "-15deg" }],
    zIndex: 2,
  },
  activeNav: {
    backgroundColor: theme.colors.primary[700],
    borderRadius: 40,
    zIndex: 4,
  },
  button: {
    position: "absolute",
    bottom: width * 0.4,
    zIndex: 4,
  },
});

export default PhoneTrainingScreen;

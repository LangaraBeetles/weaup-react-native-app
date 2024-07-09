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
import Icon from "@src/components/ui/Icon";

const { height, width } = Dimensions.get("screen");

const EarbudsTrainingScreen = () => {
  const navigation = useNavigation();

  const next = () => {
    router.push("/setup/earbuds-training");
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <Stack
          style={{
            position: "absolute",
            top: Platform.OS === "android" ? height * 0.08 : height * 0.04,
            left: width * 0.07,
            zIndex: 2,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <Icon name={"arrow-left"} size={20} />
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
            height: "60%",
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
            height: "40%",
          }}
        />
        <Center
          w={236}
          h={456}
          style={{
            marginHorizontal: "auto",
            marginTop: height * 0.15,
          }}
        >
          <Image name="weasel-happy" />
        </Center>
        <Stack w={61} h={53} style={styles.sparkling}>
          <Image name="sparkling" />
        </Stack>
        <Stack w={24} h={24} style={styles.star}>
          <Image name="four-corner-star" />
        </Stack>
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
                  You’re connected!
                </Text>
                <Text align="center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </Text>
              </Stack>

              <Button title="Confirm" onPress={next} variant="primary" />
            </Stack>
          </Center>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom:
      height < 850 && Platform.OS === "android" ? height * 0.1 : height * 0.2,
    width: width * 0.9,
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
  },
  back: {
    backgroundColor: theme.colors.white,
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  sparkling: {
    position: "absolute",
    top: height * 0.18,
    left: width * 0.13,
  },
  star: {
    position: "absolute",
    top: height * 0.15,
    right: width * 0.15,
  },
});

export default EarbudsTrainingScreen;

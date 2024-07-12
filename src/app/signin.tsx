import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";
import Input from "@src/components/ui/Input";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import config from "@src/config";
import { theme } from "@src/styles/theme";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import BackButton from "@src/components/ui/BackButton";

const { height, width } = Dimensions.get("screen");

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogIn = () => {
    // TODO: Implement sign in logic with email and password
  };

  const handleContinueWithGoogle = async () => {
    try {
      //get google auth link [public]
      const {
        data: { data },
      } = await axios.get(`${config.api_url}/auth/google`);

      if (data.redirect) {
        setLoading(true);
        Linking.openURL(data.redirect);
      }
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!!loading && (
        <View
          style={{
            width,
            height,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flex: 1,
            zIndex: 2,
          }}
        >
          <ActivityIndicator size="large" style={{ flex: 1 }} />
        </View>
      )}
      <Stack h={height} style={{ alignItems: "center" }}>
        <Stack
          style={{
            position: "absolute",
            top: Platform.OS === "android" ? height * 0.08 : height * 0.04,
            left: width * 0.07,
            zIndex: 2,
          }}
        >
          <BackButton
            onBack={() => {
              const canGoBack = router.canGoBack();
              canGoBack ? router.back() : router.replace("/");
            }}
          />
        </Stack>
        <BackgroundGradient />
        <Center
          w={236}
          h={456}
          style={{
            marginHorizontal: "auto",
            marginTop: height * 0.05,
          }}
        >
          <Image name="weasel-happy" />
        </Center>
        <Stack w={width * 0.9} gap={32} style={style.content}>
          <Text level="title_1" style={{ color: theme.colors.primary[900] }}>
            Welcome back!
          </Text>
          <Stack w={"100%"} gap={16}>
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </Stack>
          <TouchableOpacity>
            <Text
              level="footnote"
              weight="bold"
              style={{ color: theme.colors.secondary[700] }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          <Stack w={"100%"} gap={20}>
            <Button title="Log in" variant="primary" onPress={handleLogIn} />
            <Center w={"100%"} flexDirection="row" gap={13}>
              <Stack
                h={"50%"}
                w={"40%"}
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.neutral[300],
                  bottom: 5,
                }}
              />
              <Text
                level="footnote"
                style={{ color: theme.colors.neutral[400] }}
              >
                OR
              </Text>
              <Stack
                h={"50%"}
                w={"40%"}
                style={{
                  borderStyle: "solid",
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.neutral[300],
                  bottom: 5,
                }}
              />
            </Center>
            <Button
              variant="secondary"
              onPress={handleContinueWithGoogle}
              title="Continue with Google"
              leadingIcon="google-icon"
            />
          </Stack>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  back: {
    backgroundColor: theme.colors.white,
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    zIndex: 4,
    position: "absolute",
    bottom:
      height < 850 && Platform.OS == "android" ? width * 0.15 : width * 0.25,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default SignIn;

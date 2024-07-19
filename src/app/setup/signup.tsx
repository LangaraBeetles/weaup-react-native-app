import useAuth from "@src/components/hooks/useAuth";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import { useUser } from "@src/state/useUser";
import { Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import { theme } from "@src/styles/theme";
import Input from "@src/components/ui/Input";
import React, { useState } from "react";
import Button from "@src/components/ui/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import GoogleButton from "@root/src/components/ui/GoogleButton";

const { height, width } = Dimensions.get("screen");

const SignUp = () => {
  const completeSetup = useUser((state) => state.completeSetup);
  const isAuth = useUser((data) => data.isAuth);
  const { createGuestUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    // TODO: Implement sign up logic with email and password
  };

  const handleContinueAsGuest = () => {
    completeSetup();
    if (!isAuth) {
      createGuestUser();
    }
    router.navigate("/setup/welcome");
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <BackgroundGradient />
        <Stack w={width * 0.9} gap={32} style={style.content}>
          <Text level="title_1" style={{ color: theme.colors.primary[900] }}>
            Create an account
          </Text>
          <Stack w={"100%"} gap={16}>
            <Input
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
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
          <Stack w={"100%"} gap={32}>
            <Button
              variant="primary"
              onPress={handleContinue}
              title="Continue"
            />
            <GoogleButton title="Continue with Google" />
            <TouchableOpacity onPress={handleContinueAsGuest}>
              <Text
                level="title_3"
                style={{
                  color: theme.colors.primary[700],
                  marginHorizontal: "auto",
                }}
              >
                Continue with Guest Mode
              </Text>
            </TouchableOpacity>
          </Stack>
          <Text level="footnote" style={{ color: theme.colors.neutral[500] }}>
            Note: Guest mode limits challenge with friends. Sign in to unlock
            full functionality.
          </Text>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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

export default SignUp;

import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack, Text, Input, Button } from "@src/components/ui";
import { theme } from "@src/styles/theme";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import GoogleButton from "@root/src/components/ui/GoogleButton";
import { useUser } from "@src/state/useUser";
import useAuth from "@src/components/hooks/useAuth";
import { router } from "expo-router";

const { height, width } = Dimensions.get("screen");

const SignUp = () => {
  const { completeSetup, isAuth } = useUser();
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
    <SafeAreaView style={styles.main}>
      <BackgroundGradient />
      <Stack h={height} style={styles.container}>
        <Stack w={width * 0.9} style={styles.content}>
          <Text level="title_1" style={styles.title}>
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
            <GoogleButton />
            <TouchableOpacity onPress={handleContinueAsGuest}>
              <Text level="title_3" style={styles.guestModeText}>
                Continue with Guest Mode
              </Text>
            </TouchableOpacity>
          </Stack>
          <Text level="footnote" style={styles.noteText}>
            Note: Guest mode limits challenge with friends. Sign in to unlock
            full functionality.
          </Text>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
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
  title: {
    color: theme.colors.primary[900],
  },
  guestModeText: {
    color: theme.colors.primary[700],
    textAlign: "center",
  },
  noteText: {
    color: theme.colors.neutral[500],
  },
});

export default SignUp;

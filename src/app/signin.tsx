import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Image from "@src/components/ui/Image";
import Input from "@src/components/ui/Input";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import BackButton from "@src/components/ui/BackButton";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { impersonate } from "@src/services/authApi";
import { useUser } from "@src/state/useUser";
import { UserType } from "@src/interfaces/user.types";
import GoogleButton from "@src/components/ui/GoogleButton";

const { height, width } = Dimensions.get("screen");
const platform = Platform.OS;

const SignIn = () => {
  const { setAuth, setGuest } = useUser();

  const form = useForm<{ email: string; password: string }>();
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: mockLogin, isPending } = useMutation({
    mutationKey: ["impersonate"],
    mutationFn: impersonate,
    onSuccess: (userResponse) => {
      const user: UserType = {
        id: userResponse.id,
        deviceId: userResponse.device_id,
        name: userResponse.name,
        dailyGoal: userResponse.daily_goal,
        providerId: userResponse.provider_id,
        level: userResponse.level,
        xp: userResponse.xp,
        hp: userResponse.hp,
        token: userResponse.token,
        email: userResponse.email ?? "",
        preferredMode: userResponse.preferred_mode,
        isSetupComplete: true,
        dailyStreakCounter: 0,
        avatar: userResponse.avatar_bg,
        badges: userResponse?.badges || [],
      };

      setGuest(false);
      setAuth(true, user);

      // router.dismissAll();
      router.replace("/");
    },
    onError: (error) => {
      console.log({ error });
      console.error("Bad credentials");
    },
  });

  const handleLogIn = () => {
    form.handleSubmit((data) => {
      mockLogin(data.email);
    })();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!!loading && (
        <Pressable
          onPress={() => setLoading(false)}
          style={{
            width,
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
        </Pressable>
      )}
      <Stack h={height} style={{ alignItems: "center" }}>
        <Stack
          style={{
            position: "absolute",
            top: platform === "android" ? height * 0.08 : height * 0.04,
            left: width * 0.07,
            zIndex: 2,
          }}
        >
          <BackButton
            onBack={() => {
              const canGoBack = router.canGoBack();

              canGoBack ? router.back() : router.navigate("/");
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
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <Input
                    autoCapitalize="none"
                    placeholder="Email Address"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                );
              }}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <Input
                    placeholder="Password"
                    value={field.value}
                    onChangeText={field.onChange}
                    textContentType="password"
                  />
                );
              }}
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
          <Stack w={"75%"} gap={20}>
            <Button
              title={isPending ? "Loading..." : "Log in"}
              variant="primary"
              onPress={handleLogIn}
            />
            <Center w={"100%"} flexDirection="row" gap={13}>
              <Stack
                h="50%"
                w="40%"
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
            <GoogleButton />
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
    bottom: height < 850 && platform == "android" ? width * 0.15 : width * 0.25,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default SignIn;

import React, { useEffect } from "react";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { useGlobalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native";
import useAuth from "@src/components/hooks/useAuth";

type AuthParams = {
  _id: string;
  name: string;
  email: string;
  preferred_mode: string;
  daily_goal: string;
  level: string;
  is_setup_complete: string;
  xp: string;
  hp: string;
  device_id: string;
  provider_id: string;
  token: string;
};

const AuthCallback = () => {
  const params = useGlobalSearchParams<AuthParams>();
  // const router = useRouter();
  const { handleGoogleAuthCallback } = useAuth();

  useEffect(() => {
    if (params && params._id && params.token) {
      const completeSignIn = async () => {
        await handleGoogleAuthCallback(params as any);

        router.navigate("/");
      };

      completeSignIn();
    }
  }, [params]);

  const handleContinuePress = () => {
    router.navigate("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center p={30} flex={1}>
        <Stack flexDirection="column" gap={30}>
          <Text level="title_1" align="center">
            Welcome {params?.name}!
          </Text>
          <Button
            title="Yey! Continue"
            onPress={handleContinuePress}
            variant="primary"
          />
        </Stack>
      </Center>
    </SafeAreaView>
  );
};

export default AuthCallback;

import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { useGlobalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native";
import useAuth from "@src/components/hooks/useAuth";
import { googleAuth } from "@src/services/authApi";
import { theme } from "@src/styles/theme";

type AuthParams = {
  name: string;
  token: string;
};

const AuthCallback = () => {
  const params = useGlobalSearchParams<AuthParams>();
  // const router = useRouter();
  const { handleGoogleAuthCallback } = useAuth();

  useEffect(() => {
    if (params?.token) {
      googleAuth(params.token as string).then(async (res) => {
        params.name = res.name;
        const completeSignIn = async () => {
          await handleGoogleAuthCallback(res as any);
          setTimeout(() => {
            router.navigate("/");
          }, 1000);
        };

        completeSignIn();
      });
    }
  }, [params]);

  const handleContinuePress = () => {
    router.navigate("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center p={30} flex={1}>
        {params?.name ? (
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
        ) : (
          <Stack flexDirection="column" gap={30}>
            <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          </Stack>
        )}
      </Center>
    </SafeAreaView>
  );
};

export default AuthCallback;

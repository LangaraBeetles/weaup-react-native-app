import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { theme } from "@src/styles/theme";
import { useUser } from "@src/state/useUser";

const AuthCallback = () => {
  const { user } = useUser();

  useEffect(() => {
    setTimeout(() => {
      router.navigate("/");
    }, 1500);
  }, [user]);

  const handleContinuePress = () => {
    router.navigate("/");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Center p={30} flex={1}>
        {user?.email ? (
          <Stack flexDirection="column" gap={30}>
            <Text level="title_1" align="center">
              Welcome {user?.name}!
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

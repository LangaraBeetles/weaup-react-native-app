import React from "react";
import { Text } from "react-native";
import ImageUploader from "@src/components/ImageUploader";
import { theme } from "@src/styles/theme";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Button from "@src/components/ui/Button";
import authApi from "@src/services/authApi";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";

const ProfileScreen = () => {
  const isGuest = useUser((data) => data.isGuest);
  const router = useRouter();
  const { logout } = authApi();

  const handleLogout = async () => {
    logout();
    router.replace("/");
  };

  if (isGuest) {
    return <GoogleSignUp />;
  }

  return (
    <Center
      backgroundColor={theme.colors.$blue8}
      height="100%"
      flex={1}
      gap={24}
    >
      <Text>Profile Page text</Text>

      <Stack flexDirection="column" alignItems="center" gap={8}>
        <Stack
          flexDirection="column"
          gap={18}
          border={1}
          borderRadius={4}
          p={18}
          w="50%"
        >
          <Text>One</Text>
          <Text>Two</Text>
        </Stack>

        <Stack flexDirection="row" gap={18} border={1} borderRadius={4} p={18}>
          <Text>One</Text>
          <Text>Two</Text>
        </Stack>
      </Stack>
      <ImageUploader />
      {!isGuest && (
        <Button
          title="Logout"
          type={{ type: "primary", size: "l" }}
          onPress={handleLogout}
        />
      )}
    </Center>
  );
};

export default ProfileScreen;

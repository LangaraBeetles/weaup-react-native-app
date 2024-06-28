import React from "react";
import { Text } from "react-native";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Center from "@src/components/ui/Center";
import Button from "@src/components/ui/Button";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";
import useAuth from "@src/components/hooks/useAuth";

// import ImageUploader from "@src/components/ImageUploader";

const ProfileScreen = () => {
  const isGuest = useUser((data) => data.isGuest);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    router.replace("/");
  };

  if (isGuest) {
    return <GoogleSignUp />;
  }

  return (
    <Center height="100%" flex={1} gap={24}>
      <Text>Profile Page text</Text>

      {/* <ImageUploader /> */}

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

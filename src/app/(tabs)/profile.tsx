import { Text } from "react-native";
import ImageUploader from "@src/components/ImageUploader";
import { theme } from "@src/styles/theme";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import { useUser } from "@src/state/useUser";
import { Redirect } from "expo-router";
import Button from "@src/components/ui/Button";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const isAuth = useUser((data) => data.isAuth);
  const router = useRouter();

  if (!isAuth) {
    return <Redirect href="/provider-signup" />;
  }

  const logout = () => {
    const user = {
      id: "",
      deviceIds: [],
      currentDeviceId: null,
      name: "",
      dailyGoal: 80,
      providerId: "",
      level: 1,
      xp: 0,
      hp: 100,
      daily_streak_counter: 0,
      token: "",
    };

    useUser.getState().setAuth(false, user);
    router.push("/");
  };

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
      <Button
        title="Logout"
        type={{ type: "primary", size: "l" }}
        onPress={logout}
      />
    </Center>
  );
};

export default ProfileScreen;

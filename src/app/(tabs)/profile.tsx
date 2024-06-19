import { Text } from "react-native";
import ImageUploader from "@src/components/ImageUploader";
import { theme } from "@src/styles/theme";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";

const ProfileScreen = () => {
  return (
    <Center backgroundColor={theme.colors.$blue8} height="100%" gap={24}>
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
    </Center>
  );
};

export default ProfileScreen;

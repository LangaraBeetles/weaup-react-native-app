import { theme } from "@root/src/styles/theme";
import Box from "../ui/Box";
import Divider from "../ui/Divider";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const AppTutorialCard = () => {
  const handlePress = () => {
    router.navigate("/setup/start");
  };

  return (
    <Box>
      <Stack gap={16}>
        <Stack flexDirection="row" gap={8}>
          <Icon name="refresh-tutorial" size={20} />
          <Text level="subhead" weight="bold">
            App Tutorial
          </Text>
        </Stack>
        <Divider />
        <TouchableOpacity onPress={handlePress}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            gap={8}
            style={{ alignItems: "center" }}
          >
            <Text level="footnote" weight="default">
              Replay Onboarding
            </Text>
            <Icon
              name="chevron-right"
              size={16}
              color={theme.colors.neutral[400]}
            />
          </Stack>
        </TouchableOpacity>
      </Stack>
    </Box>
  );
};

export default AppTutorialCard;

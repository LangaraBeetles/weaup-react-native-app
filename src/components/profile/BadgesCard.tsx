import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "../ui/Box";
import ProfileBadgeContainerPreview from "../container/ProfileBadgeContainerPreview";
import Divider from "../ui/Divider";
import { router } from "expo-router";

const BadgesCard = () => {
  const userBadges = useUser((state) => state.user.badges);

  const viewBadges = () => {
    router.navigate("/badges/");
  };

  return (
    <Box>
      <Stack gap={18}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="row" gap={8} alignItems="center">
            <Icon name="colorLabelIcon-award" />

            <Text level="subhead" weight="bold" style={styles.title}>
              Badges
            </Text>
          </Stack>

          <Text level="headline">{userBadges?.length || 0}</Text>
        </Stack>
        <ProfileBadgeContainerPreview />

        <Divider />

        {/* <TouchableOpacity onPress={viewBadges}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text level="footnote">View all</Text>

            <Icon name="chevron-right" />
          </Stack>
        </TouchableOpacity> */}
      </Stack>
    </Box>
  );
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.colors.neutral[800],
  },
});

export default BadgesCard;

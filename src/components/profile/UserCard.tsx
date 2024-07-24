import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import Avatar from "../ui/Avatar";
import { Text } from "../ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import { theme } from "@src/styles/theme";

const UserCard = () => {
  const isGuest = useUser((state) => state.isGuest);

  const userName = useUser((state) => state.user.name);
  const userEmail = useUser((state) => state.user.email);
  const avatarColor = useUser((state) => state.user.avatar_bg);
  const avatarImg = useUser((state) => state.user.avatar_img);

  return (
    <Stack flexDirection="row" gap={12}>
      <Avatar
        variant={avatarColor}
        content={userName?.[0] ?? "G"}
        size={48}
        fontSize={22}
        borderWidth={2}
        borderColor={theme.colors.white}
        showDefault={isGuest}
        src={avatarImg}
      />

      <Stack
        flexDirection="row"
        justifyContent="space-between"
        flex={1}
        alignItems="center"
      >
        <Stack>
          <Text level="title_3" style={styles.title}>
            {userName ?? "Guest User"}
          </Text>
          {!!userEmail && (
            <Text level="subhead" style={styles.subhead1}>
              {userEmail}
            </Text>
          )}
        </Stack>
        <Icon name="chevron-right" />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  title: {
    color: globalStyles.colors.neutral[800],
  },
  subhead1: {
    color: globalStyles.colors.neutral[500],
  },
});

export default UserCard;

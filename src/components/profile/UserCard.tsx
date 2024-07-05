import { useUser } from "@src/state/useUser";
import Icon from "../ui/Icon";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";

const UserCard = () => {
  const userName = useUser((state) => state.user.name);
  const userEmail = useUser((state) => state.user.email);

  return (
    <Stack flexDirection="row" gap={12}>
      <Icon name="profile-avatar" />
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        flex={1}
        alignItems="center"
      >
        <Stack>
          <Text level="title_3" style={styles.title}>
            {userName}
          </Text>
          <Text level="subhead" style={styles.subhead1}>
            {userEmail}
          </Text>
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

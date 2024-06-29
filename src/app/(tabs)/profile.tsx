import React from "react";
import { useUser } from "@src/state/useUser";
import { useRouter } from "expo-router";
import Center from "@src/components/ui/Center";
import Button from "@src/components/ui/Button";
import GoogleSignUp from "@src/components/profile/GoogleSignUp";
import useAuth from "@src/components/hooks/useAuth";
import Icon from "@src/components/ui/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import Stack from "@src/components/ui/Stack";
import { Text } from "@src/components/ui/typography";
import { StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import Box from "@src/components/ui/Box";
import Spacer from "@src/components/ui/Spacer";

const ProfileScreen = () => {
  const isGuest = useUser((data) => data.isGuest);
  const userName = useUser((state) => state.user.name);
  const userEmail = useUser((state) => state.user.email);
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
    <SafeAreaView style={styles.constainer}>
      <Stack gap={20}>
        {/* Element 1 */}
        <Stack flexDirection="row" gap={3}>
          <Icon name="profile-avatar" />
          <Stack flexDirection="row" justifyContent="space-between" flex={1}>
            <Stack>
              <Text level="title_3" style={styles.title}>
                {userName}
              </Text>
              <Text level="subhead" style={styles.subhead1}>
                {userEmail}
              </Text>
            </Stack>
            <Center>
              <Icon name="chevron-right" />
            </Center>
          </Stack>
        </Stack>

        {/* Element 2 */}
        <Box>
          <Stack flexDirection="row" gap={3}>
            <Icon name="profile-avatar" />
            <Stack flexDirection="row" justifyContent="space-between" flex={1}>
              <Stack>
                <Text level="title_3" style={styles.title}>
                  {userName}
                </Text>
                <Text level="subhead" style={styles.subhead1}>
                  {userEmail}
                </Text>
              </Stack>
              <Center>
                <Icon name="chevron-right" />
              </Center>
            </Stack>
          </Stack>
        </Box>

        {/* Element 3 */}
        <Box></Box>

        {/* Element 4 */}
        <Box></Box>

        {/* Element 5 */}
        <Box></Box>

        {/* Element 6 */}
        <Box></Box>
      </Stack>
      <Spacer height={40} />

      {!isGuest && (
        <Button title="Logout" variant="primary" onPress={handleLogout} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  constainer: {
    padding: 16,
    paddingTop: 32,
  },
  title: {
    color: globalStyles.colors.neutral[800],
  },
  subhead1: {
    color: globalStyles.colors.neutral[500],
  },
});
export default ProfileScreen;

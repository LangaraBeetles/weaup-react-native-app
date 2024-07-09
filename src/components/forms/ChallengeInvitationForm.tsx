import { View, StyleSheet, Image } from "react-native";

import { Text } from "@src/components/ui/typography";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import ShareButton from "@src/components/ui/ShareButton";
import { ChallengeInputType } from "@src/interfaces/challenge.types";
import { useFormContext } from "react-hook-form";

const ChallengeInvitationForm = (props: {
  handleCloseModalPress: () => void;
}) => {
  const { handleCloseModalPress } = props;
  const { watch } = useFormContext<ChallengeInputType>();

  const url = watch("url");

  return (
    <View style={styles.main}>
      <Center p={16}>
        <Text level="title_2">Your challenge is set up!</Text>
      </Center>
      <Stack
        px={16}
        h={"90%"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>
          Invite your teammates to New Challenge by sharing the code below
        </Text>

        <Stack justifyContent="flex-end" alignItems="center">
          <ShareButton url={url} />
          <Button
            variant="secondary"
            title="Not Now"
            onPress={handleCloseModalPress}
          ></Button>
        </Stack>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    paddingBottom: 20,
  },
});

export default ChallengeInvitationForm;

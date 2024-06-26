import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { Text } from "@src/components/ui/typography";
import Center from "@src/components/ui/Center";
import Stack from "@src/components/ui/Stack";
import Button from "@src/components/ui/Button";
import ShareButton from "@src/components/ui/ShareButton";

const ChallengeInvitationForm = (props: any) => {
  const { url, handleCloseModalPress } = props;

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
        <Image source={require("../../../assets/img/confetti.png")} />

        <Stack justifyContent="flex-end" alignItems="center">
          <ShareButton url={url} />
          <Button
            type={{ type: "secondary", size: "l" }}
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

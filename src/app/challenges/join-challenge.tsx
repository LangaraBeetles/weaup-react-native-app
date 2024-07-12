import JoinChallengeContainer from "@src/components/container/JoinChallengeContainer";
import { Redirect, useLocalSearchParams } from "expo-router";

const JoinChallenge = () => {
  const params = useLocalSearchParams();

  if (!params) {
    return <Redirect href="/" />;
  }

  return (
    <JoinChallengeContainer
      challengeId={params?.id as string}
      userId={params?.user as string}
    />
  );
};

export default JoinChallenge;

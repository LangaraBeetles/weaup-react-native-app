import JoinChallengeContainer from "@src/components/container/JoinChallengeContainer";
import { useUser } from "@src/state/useUser";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";

const JoinChallenge = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const isGuest = useUser((state) => state.isGuest);

  if (!params) {
    return <Redirect href="/" />;
  }

  if (isGuest) {
    router.replace("signin");
    return;
  }

  return (
    <JoinChallengeContainer
      challengeId={params?.id as string}
      userId={params?.user as string}
    />
  );
};

export default JoinChallenge;

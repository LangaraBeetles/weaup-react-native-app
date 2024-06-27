import { FlatList, Text } from "react-native";
import { useRouter } from "expo-router";

import Center from "@src/components/ui/Center";
import ChallengeCard from "@src/components/listItems/ChallengeCard";
import Chip from "@src/components/ui/Chip";

const ChallengeList = (props: any) => {
  const router = useRouter();
  const { challenges, isOngoing } = props;

  const viewPastChallenges = () => {
    router.navigate("pastChallengesScreen");
  };

  return (
    <FlatList
      data={challenges}
      ListFooterComponent={() => {
        return (
          isOngoing && (
            <Center>
              <Chip
                borderRadius={50}
                p={12}
                h={45}
                onPress={viewPastChallenges}
              >
                <Text>View past challenges</Text>
              </Chip>
            </Center>
          )
        );
      }}
      renderItem={({ item }) => {
        return <ChallengeCard challenge={item} isOngoing={isOngoing} />;
      }}
    />
  );
};

export default ChallengeList;

import { FlatList } from "react-native";

import Center from "@src/components/ui/Center";
import Button from "@src/components/ui/Button";
import ChallengeCard from "@src/listItems/ChallengeCard";

const ChallengeList = (props: any) => {
  const { challenges, viewPastChallenges, showDetails } = props;

  return (
    <FlatList
      data={challenges}
      renderItem={({ item, index }) => {
        if (index === challenges.length - 1) {
          return (
            <Center>
              <Button
                type={{ type: "primary", size: "l" }}
                title="View past challenges"
                onPress={viewPastChallenges}
              ></Button>
            </Center>
          );
        }
        return <ChallengeCard challenge={item} showDetails={showDetails} />;
      }}
    />
  );
};

export default ChallengeList;

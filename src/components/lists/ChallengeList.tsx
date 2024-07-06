import { FlatList } from "react-native";

import ChallengeCard from "@src/components/listItems/ChallengeCard";
import { ChallengeResponseType } from "@src/interfaces/challenge.types";

const ChallengeList = ({
  onRefresh,
  challenges,
  ListFooterComponent,
  refreshing = false,
}: {
  refreshing?: boolean;
  onRefresh: () => void;
  challenges: ChallengeResponseType[];
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
}) => {
  return (
    <FlatList
      data={challenges}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={ListFooterComponent}
      renderItem={({ item }) => {
        return <ChallengeCard challenge={item} />;
      }}
    />
  );
};

export default ChallengeList;

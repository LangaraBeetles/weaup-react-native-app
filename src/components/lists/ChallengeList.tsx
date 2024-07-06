import { FlatList } from "react-native";

import ChallengeCard from "@src/components/listItems/ChallengeCard";
import { ChallengeResponseType } from "@src/interfaces/challenge.types";

const ChallengeList = ({
  challenges,
  ListFooterComponent,
}: {
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
      ListFooterComponent={ListFooterComponent}
      renderItem={({ item }) => {
        return <ChallengeCard challenge={item} />;
      }}
    />
  );
};

export default ChallengeList;

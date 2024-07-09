import { View } from "react-native";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Avatar from "@src/components/ui/Avatar";
import ScoreChip from "@src/components/scoring/ScoreChip";

const MemberCard = (props: any) => {
  const { itemStyle, item } = props;
  return (
    <View style={itemStyle}>
      <Stack flexDirection="row" justifyContent="space-between" py={16}>
        <Stack flexDirection="row" gap={8} flex={4}>
          <Avatar content={item?.user?.name[0]} />
          <View>
            <Text level="headline">{item?.user?.name}</Text>
            <Text level="footnote">{item?.points} points</Text>
          </View>
        </Stack>
        <ScoreChip score={item?.user?.hp ?? 0} />
      </Stack>
    </View>
  );
};

export default MemberCard;

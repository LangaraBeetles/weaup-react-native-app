import { View } from "react-native";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Avatar from "@src/components/ui/Avatar";
import ScoreChip from "@src/components/scoring/ScoreChip";
import safenumber from "@src/utils/safenumber";

const MemberCard = (props: any) => {
  const { itemStyle, item } = props;
  return (
    <View style={itemStyle}>
      <Stack flexDirection="row" justifyContent="space-between" py={16}>
        <Stack flexDirection="row" gap={8} flex={4}>
          <Avatar
            content={item?.user?.name?.[0]}
            variant={item?.user?.avatar_bg ?? "gray1"}
          />
          <View>
            <Text level="headline">{item?.user?.name}</Text>
            <Text level="footnote">{safenumber(item?.points)} points</Text>
          </View>
        </Stack>
        <ScoreChip score={safenumber(item?.user?.hp) ?? 0} />
      </Stack>
    </View>
  );
};

export default MemberCard;

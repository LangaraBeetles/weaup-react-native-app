import { View } from "react-native";

import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import Icon from "@src/components/ui/Icon";
import { globalStyles } from "@src/styles/globalStyles";
import Avatar from "@src/components/ui/Avatar";

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
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={8}
          border={1}
          borderColor={globalStyles.colors.neutral[100]}
          borderRadius={100}
          px={8}
          py={12}
          w={"100%"}
          flex={1}
        >
          <Icon name="colorLabelIcon-star" />
          <Text level="callout">{item?.user?.hp}</Text>
        </Stack>
      </Stack>
    </View>
  );
};

export default MemberCard;

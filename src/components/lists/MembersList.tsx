import { View, FlatList, StyleSheet } from "react-native";

import { Text } from "@src/components/ui/typography";
import MemberCard from "@src/components/listItems/MemberCard";
import { globalStyles } from "@src/styles/globalStyles";

const MembersList = (props: any) => {
  const { members } = props;

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text level="headline">Individual rankings</Text>
      <FlatList
        style={styles.cardList}
        data={members}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          let itemStyle = styles.listItem;
          if (index === members.length - 1) {
            itemStyle = styles.lastItem;
          }
          return <MemberCard itemStyle={itemStyle} item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardList: {
    backgroundColor: globalStyles.colors.white,
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: globalStyles.colors.neutral[100],
  },
  listItem: {
    borderBottomColor: globalStyles.colors.neutral[100],
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomColor: "transarent",
    borderBottomWidth: 0,
  },
});
export default MembersList;

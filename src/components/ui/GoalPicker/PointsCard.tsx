import { StyleSheet, View } from "react-native";
import Box from "../Box";
import { Text } from "../typography";
import Stack from "../Stack";
import { globalStyles } from "@src/styles/globalStyles";

const PointsCard = ({ points }: { points: number }) => {
  return (
    <View style={styles.container}>
      <Box
        bg={globalStyles.colors.neutral[50]}
        bc={globalStyles.colors.neutral[100]}
      >
        <Stack
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
        >
          <Text>Points to achieve</Text>
          <Text level="title_3">{points?.toLocaleString()}</Text>
        </Stack>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

export default PointsCard;

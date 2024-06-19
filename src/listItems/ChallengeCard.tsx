import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@src/styles/globalStyles";
import ProgressBar from "@src/components/ui/ProgressBar";

const ChallengeCard = (props: any) => {
  const { challenge, showDetails } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDetails}>
        <Text>{challenge.name}</Text>
        <Text>
          {challenge.end_at.getDate() - new Date().getDate()} days left
        </Text>
        <ProgressBar
          currentValue={challenge.progress}
          goal={challenge.goal}
        ></ProgressBar>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: globalStyles.colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});

export default ChallengeCard;

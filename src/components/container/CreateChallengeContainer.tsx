import { useState, useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      confirmExit,
    );
    return () => backHandler.remove();
  }, [step]);

  const confirmExit = () => {
    if (step == 0) {
      Alert.alert("Hold on!", "Are you sure you want to cancel?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => handleCloseModalPress() },
      ]);
    } else {
      setStep(step - 1);
    }

    return true;
  };

  return (
    <View>
      {step == 0 && (
        <ChallengeDetailsForm
          handleStep={setStep}
          handleCloseModalPress={confirmExit}
        />
      )}
      {step == 1 && <ChallengeGoalForm handleStep={setStep} />}
      {step == 2 && <ChallengeConfirmationForm handleStep={setStep} />}
      {step == 3 && (
        <ChallengeInvitationForm
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
    </View>
  );
};

export default CreateChallengeContainer;

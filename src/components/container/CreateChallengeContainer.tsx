import { useState, useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

import { ChallengeStatusEnum } from "@src/interfaces/challenge.types";
import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";

const initialValues = {
  creator_id: "66693e1628ed06d3f5dcf64b", //TODO: Replace with useUser.getState().user.id when login/sign up is implemented
  name: null,
  description: null,
  start_at: new Date(),
  end_at: new Date(),
  duration: 0,
  goal: 80,
  status: ChallengeStatusEnum.IN_PROGRESS,
  members: [
    {
      user_id: "66693e1628ed06d3f5dcf64b", //TODO: Replace with useUser.getState().user.id when login/sign up is implemented
    },
  ],
};

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState(initialValues);

  const handleChallenge = (fieldName: string, newValue: any) => {
    setChallenge((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  //handles back press
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
    } else if (step == 3) {
      handleCloseModalPress();
    } else {
      setStep(step - 1);
    }

    return true;
  };

  return (
    <View>
      {step == 0 && (
        <ChallengeDetailsForm
          challenge={challenge}
          handleChallenge={handleChallenge}
          handleCloseModalPress={confirmExit}
          handleStep={setStep}
        />
      )}
      {step == 1 && (
        <ChallengeGoalForm
          challenge={challenge}
          handleChallenge={handleChallenge}
          handleStep={setStep}
        />
      )}
      {step == 2 && (
        <ChallengeConfirmationForm challenge={challenge} handleStep={setStep} />
      )}
      {step == 3 && (
        <ChallengeInvitationForm
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
    </View>
  );
};

export default CreateChallengeContainer;

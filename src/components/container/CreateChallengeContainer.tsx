import { useState, useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

import {
  ChallengeStatusEnum,
  ChallengeType,
} from "@src/interfaces/challenge.types";
import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";
import { FormProvider, useForm } from "react-hook-form";

const initialValues = {
  // creator_id: "667c5463a320e80d83222fe0", //TODO: Replace with useUser.getState().user.id when login/sign up is implemented
  name: null,
  description: null,
  start_at: null,
  end_at: null,
  duration: 1,
  goal: 80,
  // status: ChallengeStatusEnum.IN_PROGRESS,
  // members: [
  //   {
  //     user_id: "667c5463a320e80d83222fe0", //TODO: Replace with useUser.getState().user.id when login/sign up is implemented
  //   },
  // ],
};

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);
  const [challenge, setChallenge] = useState(initialValues);
  const [url, setUrl] = useState("");

  const form = useForm<ChallengeType>();

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
      <FormProvider {...form}>
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
          <ChallengeConfirmationForm
            challenge={challenge}
            handleChallenge={handleChallenge}
            handleStep={setStep}
            setUrl={setUrl}
          />
        )}
        {step == 3 && (
          <ChallengeInvitationForm
            handleCloseModalPress={handleCloseModalPress}
            url={url}
          />
        )}
      </FormProvider>
    </View>
  );
};

export default CreateChallengeContainer;

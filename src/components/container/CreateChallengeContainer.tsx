import { useState, useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

import { ChallengeInputType } from "@src/interfaces/challenge.types";
import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";
import { FormProvider, useForm } from "react-hook-form";

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState("");
  const form = useForm<ChallengeInputType>();

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
            handleCloseModalPress={confirmExit}
            handleStep={setStep}
          />
        )}
        {step == 1 && <ChallengeGoalForm handleStep={setStep} />}
        {step == 2 && (
          <ChallengeConfirmationForm handleStep={setStep} setUrl={setUrl} />
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

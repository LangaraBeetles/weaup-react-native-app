import { useEffect } from "react";
import { View, BackHandler, Alert } from "react-native";

import { ChallengeInputType } from "@src/interfaces/challenge.types";
import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";
import { FormProvider, useForm } from "react-hook-form";

const CreateChallengeContainer = (props: {
  handleCloseModalPress: () => void;
}) => {
  const handleCloseModalPress = props.handleCloseModalPress;

  const form = useForm<ChallengeInputType>({
    defaultValues: {
      step: "detail",
    },
  });

  const step = form.watch("step") ?? "detail";

  //handles back press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      confirmExit,
    );
    return () => backHandler.remove();
  }, [step]);

  const confirmExit = () => {
    if (step == "detail") {
      Alert.alert("Hold on!", "Are you sure you want to cancel?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleCloseModalPress() },
      ]);
    }

    if (step == "result") {
      handleCloseModalPress();
    }

    if (step === "goal") {
      form.setValue("step", "detail");
    }

    if (step === "confirmation") {
      form.setValue("step", "goal");
    }

    return true;
  };

  return (
    <View>
      <FormProvider {...form}>
        {step === "detail" && (
          <ChallengeDetailsForm onClose={handleCloseModalPress} />
        )}
        {step === "goal" && <ChallengeGoalForm />}
        {step === "confirmation" && <ChallengeConfirmationForm />}
        {step === "result" && (
          <ChallengeInvitationForm
            handleCloseModalPress={handleCloseModalPress}
          />
        )}
      </FormProvider>
    </View>
  );
};

export default CreateChallengeContainer;

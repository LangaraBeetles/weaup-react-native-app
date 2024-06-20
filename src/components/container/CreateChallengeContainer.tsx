import { useState } from "react";
import { View } from "react-native";

import ChallengeDetailsForm from "../forms/ChallengeDetailsForm";
import ChallengeGoalForm from "../forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "../forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "../forms/ChallengeInvitationForm";

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);

  const handleStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  return (
    <View>
      {step == 0 && (
        <ChallengeDetailsForm
          handleStep={handleStep}
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
      {step == 1 && (
        <ChallengeGoalForm
          handleStep={handleStep}
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
      {step == 2 && (
        <ChallengeConfirmationForm
          handleStep={handleStep}
          handleCloseModalPress={handleCloseModalPress}
        />
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

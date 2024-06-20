import { useState } from "react";
import { View } from "react-native";

import ChallengeDetailsForm from "@src/components/forms/ChallengeDetailsForm";
import ChallengeGoalForm from "@src/components/forms/ChallengeGoalForm";
import ChallengeConfirmationForm from "@src/components/forms/ChallengeConfirmationForm";
import ChallengeInvitationForm from "@src/components/forms/ChallengeInvitationForm";

const CreateChallengeContainer = (props: any) => {
  const handleCloseModalPress = props.handleCloseModalPress;
  const [step, setStep] = useState(0);

  return (
    <View>
      {step == 0 && (
        <ChallengeDetailsForm
          handleStep={setStep}
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
      {step == 1 && (
        <ChallengeGoalForm
          handleStep={setStep}
          handleCloseModalPress={handleCloseModalPress}
        />
      )}
      {step == 2 && (
        <ChallengeConfirmationForm
          handleStep={setStep}
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

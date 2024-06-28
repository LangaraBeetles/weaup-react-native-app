import Button from "@src/components/ui/Button";
import Center from "@src/components/ui/Center";
import config from "@src/config";
import axios from "axios";
import * as Linking from "expo-linking";

import { SafeAreaView } from "react-native-safe-area-context";

const GoogleSignUp = () => {
  const getAuthLink = async () => {
    try {
      //get google auth link [public]
      const {
        data: { data },
      } = await axios.get(`${config.api_url}/auth/google`);

      if (data.redirect) {
        Linking.openURL(data.redirect);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <SafeAreaView>
      <Center p={30}>
        <Button
          title="Continue with Google"
          variant="primary"
          onPress={getAuthLink}
        />
      </Center>
    </SafeAreaView>
  );
};

export default GoogleSignUp;

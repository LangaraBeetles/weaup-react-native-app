import useAuth from "@src/components/hooks/useAuth";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import { useUser } from "@src/state/useUser";
import { Dimensions, Platform, SafeAreaView, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Text } from "@src/components/ui/typography";
import Stack from "@src/components/ui/Stack";
import { theme } from "@src/styles/theme";
import Input from "@src/components/ui/Input";
import React, { useState } from "react";
import Button from "@src/components/ui/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import * as Linking from "expo-linking";
import config from "@src/config";
import {
  GoogleSigninButton,
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({
//   webClientId:
//     "46627497275-399bmosj8qmjcrehffsn614nri3cotlb.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
//   scopes: [
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email",
//   ], // what API you want to access on behalf of the user, default is email and profile
//   offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   // hostedDomain: '', // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   // accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId:
//     "46627497275-6mtcq04g2l6f9k0egehpsv02mahihhh6.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

const { height, width } = Dimensions.get("screen");

const SignUp = () => {
  const completeSetup = useUser((state) => state.completeSetup);
  const isAuth = useUser((data) => data.isAuth);
  const { createGuestUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    // TODO: Implement sign up logic with email and password
  };

  const handleContinueWithGoogle = async () => {
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

  const handleContinueAsGuest = () => {
    completeSetup();
    if (!isAuth) {
      createGuestUser();
    }
    router.navigate("/setup/welcome");
  };

  return (
    <SafeAreaView>
      <Stack h={height} style={{ alignItems: "center" }}>
        <BackgroundGradient />
        <Stack w={width * 0.9} gap={32} style={style.content}>
          <Text level="title_1" style={{ color: theme.colors.primary[900] }}>
            Create an account
          </Text>
          <Stack w={"100%"} gap={16}>
            <Input
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
          </Stack>
          <Stack w={"100%"} gap={32}>
            <Button
              variant="primary"
              onPress={handleContinue}
              title="Continue"
            />
            <Button
              variant="secondary"
              onPress={handleContinueWithGoogle}
              title="Continue with Google"
              leadingIcon="google-icon"
            />
            {/* <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              onPress={async () => {
                try {
                  await GoogleSignin.hasPlayServices();
                  const userInfo = await GoogleSignin.signIn();
                  // console.log({ userInfo });
                  // setState({ userInfo, error: undefined });
                } catch (error) {
                  console.log({ error });
                  if (isErrorWithCode(error)) {
                    switch (error.code) {
                      case statusCodes.SIGN_IN_CANCELLED:
                        // user cancelled the login flow
                        break;
                      case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // play services not available or outdated
                        break;
                      default:
                      // some other error happened
                    }
                  } else {
                    // an error that's not related to google sign in occurred
                  }
                }
              }}
              disabled={false}
            /> */}

            <TouchableOpacity onPress={handleContinueAsGuest}>
              <Text
                level="title_3"
                style={{
                  color: theme.colors.primary[700],
                  marginHorizontal: "auto",
                }}
              >
                Continue with Guest Mode
              </Text>
            </TouchableOpacity>
          </Stack>
          <Text level="footnote" style={{ color: theme.colors.neutral[500] }}>
            Note: Guest mode limits challenge with friends. Sign in to unlock
            full functionality.
          </Text>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    zIndex: 4,
    position: "absolute",
    bottom:
      height < 850 && Platform.OS == "android" ? width * 0.15 : width * 0.25,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});

export default SignUp;

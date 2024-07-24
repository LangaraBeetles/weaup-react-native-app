import { useEffect } from "react";
import { Platform, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

import app from "@root/app.json";
import Image from "@src/components/ui/Image";
import config from "@src/config";
import { googleAuth } from "@src/services/authApi";
import useAuth from "@src/components/hooks/useAuth";

import { useNavigation } from "expo-router";

WebBrowser.maybeCompleteAuthSession();
const platform = Platform.OS;

const GoogleButton = (props: { signUp?: boolean }) => {
  const { signUp } = props;

  const { handleGoogleAuthCallback } = useAuth();

  const navigation = useNavigation();

  const [, response, promptAsync] = GoogleSignIn.useAuthRequest({
    iosClientId: config.google_auth_ios,
    androidClientId: config.google_auth_android,
    redirectUri: makeRedirectUri({
      scheme:
        platform == "android"
          ? app.expo.android.package
          : app.expo.ios.bundleIdentifier,
      path: config.google_auth_path,
    }),
  });

  const login = async (googleSignInResponse: any) => {
    const { access_token } = googleSignInResponse.params;

    try {
      const result = await googleAuth(access_token as string);
      await handleGoogleAuthCallback(
        result,
        () => {
          //  We need to figure out a way to know when to redirect to the home screen and when to just go back to the prev screen aka together/profile
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "(tabs)" as never,
              },
            ],
          });
        },
        () => {
          console.log(
            "Login unsuccessful. Please verify your credentials and attempt to log in again.",
          );
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      login(response);
    }
  }, [response?.type]);

  return (
    <TouchableOpacity onPress={() => promptAsync()}>
      {platform == "android" ? (
        signUp ? (
          <Image name="google-android-btn-su" height={52}></Image>
        ) : (
          <Image name="google-android-btn-ctn" height={52}></Image>
        )
      ) : signUp ? (
        <Image name="google-ios-btn-su" height={52}></Image>
      ) : (
        <Image name="google-ios-btn-ctn" height={52}></Image>
      )}
    </TouchableOpacity>
  );
};

export default GoogleButton;

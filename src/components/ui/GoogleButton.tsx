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
import { useUser } from "@root/src/state/useUser";
import { UserType } from "@src/interfaces/user.types";

WebBrowser.maybeCompleteAuthSession();
const platform = Platform.OS;

const GoogleButton = (props: { signUp?: boolean }) => {
  const { signUp } = props;

  const { handleGoogleAuthCallback } = useAuth();

  const navigation = useNavigation();
  const user = useUser((state) => state.user);
  const completeFirstSetup = useUser((state) => state.completeFirstSetup);

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
      const result = await googleAuth(access_token as string, user as UserType);
      await handleGoogleAuthCallback(
        result,
        () => {
          completeFirstSetup();
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
    <TouchableOpacity
      onPress={() => promptAsync()}
      style={{ flex: 1, height: 40, width: "100%" }}
    >
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

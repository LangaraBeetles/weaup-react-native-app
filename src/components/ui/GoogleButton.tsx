import { useEffect } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as GoogleSignIn from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

import app from "@root/app.json";
import Button from "@src/components/ui/Button";
import config from "@src/config";
import { googleAuth } from "@src/services/authApi";
import useAuth from "@src/components/hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();
const platform = Platform.OS;

const GoogleButton = (props: { title: string }) => {
  const { title } = props;
  const { handleGoogleAuthCallback } = useAuth();
  const [request, response, promptAsync] = GoogleSignIn.useAuthRequest({
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
    googleAuth(access_token as string).then(async (res) => {
      await handleGoogleAuthCallback(res as any);
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      login(response);
    }
  }, [response, request]);

  return (
    <Button
      variant="secondary"
      onPress={() => promptAsync()}
      title={title}
      leadingIcon="google-icon"
    />
  );
};

export default GoogleButton;

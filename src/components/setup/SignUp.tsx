import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@src/styles/theme";
import BackgroundGradient from "@src/components/setup/BackgroundGradient";
import GoogleButton from "@root/src/components/ui/GoogleButton";
import { useUser } from "@src/state/useUser";
import useAuth from "@src/components/hooks/useAuth";
import Stack from "../ui/Stack";
import { Text } from "../ui/typography";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Image from "../ui/Image";
import BackButton from "../ui/BackButton";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");

type SignUpProps = {
  changePage: React.Dispatch<React.SetStateAction<string>>;
  setBackGround: React.Dispatch<React.SetStateAction<string>>;
};

const SignUp: React.FC<SignUpProps> = ({ changePage, setBackGround }) => {
  const { completeSetup, isAuth } = useUser();
  const { createGuestUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinue = () => {
    // TODO: Implement sign up logic with email and password
  };

  const handleContinueAsGuest = () => {
    completeSetup();
    if (!isAuth) {
      createGuestUser();
    }
    setBackGround(theme.colors.other[500]);
    changePage("welcome");
  };

  const onBack = () => {
    changePage("setupGoalSlider");
  };

  const slideUpAnimation = useSharedValue(height);
  const scaleImage = useSharedValue(0);

  useEffect(() => {
    slideUpAnimation.value = withTiming(0, {
      duration: 500,
      easing: Easing.bezier(0.5, 0, 0.25, 1),
    });
    scaleImage.value = withDelay(200, withTiming(1, { duration: 600 }));
  }, []);

  const slideUpStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideUpAnimation.value }],
    };
  });

  const scaleImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleImage.value }],
    };
  });

  return (
    <Stack h={height} px={16} alignItems="center">
      <BackgroundGradient />
      <Stack pt={height * 0.1} w={"100%"} style={{ zIndex: 5 }}>
        <BackButton onBack={onBack} />
      </Stack>

      <Stack h={"100%"} alignItems="center">
        <Animated.View style={[scaleImageStyle, { zIndex: 5, bottom: 50 }]}>
          <Stack h={width * 0.3} w={width * 0.3}>
            <Image name="image-on-signup" />
          </Stack>
        </Animated.View>
        <Animated.View style={[slideUpStyle, styles.content]}>
          <Stack w={width * 0.8} gap={32}>
            <Stack w={"100%"} alignItems="center">
              <Text
                level="title_1"
                style={{ color: theme.colors.primary[900], paddingBottom: 24 }}
              >
                Create an account
              </Text>
              <Stack w={"100%"} gap={20}>
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
            </Stack>
            <Stack w={"100%"} gap={20}>
              <Button
                variant="primary"
                onPress={handleContinue}
                title="Continue"
              />
              <GoogleButton />
              <TouchableOpacity onPress={handleContinueAsGuest}>
                <Stack
                  alignItems="center"
                  h={56}
                  border={1}
                  borderColor={theme.colors.primary[700]}
                  borderRadius={100}
                  justifyContent="center"
                >
                  <Text
                    level="title_3"
                    style={{ color: theme.colors.primary[700] }}
                  >
                    Continue with Guest Mode
                  </Text>
                </Stack>
              </TouchableOpacity>
            </Stack>
            <Text level="footnote" style={{ color: theme.colors.neutral[500] }}>
              Note: Guest mode limits challenge with friends. Sign in to unlock
              full functionality.
            </Text>
          </Stack>
        </Animated.View>
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    zIndex: 4,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    position: "absolute",
    bottom: height * 0.2,
    width: width * 0.9,
  },
});

export default SignUp;

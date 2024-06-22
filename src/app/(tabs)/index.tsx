import React, { useEffect } from "react";

import { Image, Pressable, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import DeviceMotionView from "@src/components/ui/DeviceMotionView";

import { useUser } from "@state/useUser";

import SessionControl from "@src/components/sessions/SessionControl";
import Stack from "@src/components/ui/Stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Center from "@src/components/ui/Center";
import TrackingModeIcon from "@src/components/homepage/TrackingModeIcon";

import LottieView from "lottie-react-native";
import { useRef } from "react";

const background = {
  not_reading: "white",
  good: "white",
  mid: "yellow",
  bad: "crimson",
};

const HomePage = () => {
  const isSetupComplete = useUser((state) => state.isSetupComplete);
  const userName = useUser((state) => state.user.name);
  const currentPosture = useUser((state) => state.currentPosture);
  const animation = useRef<any>(null);

  useEffect(() => {
    animation.current?.play?.(0, 0);

    if (currentPosture === "mid") {
      animation.current?.play?.(6, 6);
    }

    if (currentPosture === "bad") {
      animation.current?.play?.(15, 50);
    }
  }, [currentPosture]);

  if (!isSetupComplete) {
    return <Redirect href="/setup/start" />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: background[currentPosture] }}>
      <View style={{ height: "100%" }}>
        <Stack flexDirection="row" justifyContent="space-between" p={15} pb={0}>
          <Stack
            flexDirection="row"
            gap={18}
            border={1}
            borderRadius={50}
            p={10}
            alignItems="center"
          >
            {/*TODO: display avatar */}
            <Image source={require("../../../assets/img/avatar.png")} />
            {userName === null ? <Text>{userName}</Text> : null}
            {/*TODO: get user level */}
            <Text>Lv.1</Text>
          </Stack>
          <Stack flexDirection="row" gap={18} border={0} p={5}>
            <TrackingModeIcon />

            <Link href="/notifications" asChild>
              <Pressable>
                <Image
                  source={require("../../../assets/img/notifications.png")}
                />
              </Pressable>
            </Link>
          </Stack>
        </Stack>

        <Center p={15} pb={0}>
          <Stack
            flexDirection="row"
            border={1}
            borderRadius={20}
            justifyContent="space-evenly"
            w={"100%"}
            p={18}
          >
            <Stack flexDirection="row" border={0} justifyContent="space-evenly">
              <Center p={10}>
                {/* <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor="#D9D9D9"
        maximumTrackTintColor="#000000"
        onValueChange={(value) => {
          animation.current.play(value, value + 1);

          if (value > 15) {
            animation.current.play(15, 50);
          }
        }}
      /> */}

                <Image source={require("../../../assets/img/avatar.png")} />
              </Center>

              <Stack
                flexDirection="column"
                border={0}
                justifyContent="space-evenly"
              >
                <Text>Posture Score</Text>
                <Text>89 / 100</Text>
              </Stack>
            </Stack>
            <Stack
              flexDirection="column"
              border={0}
              justifyContent="space-evenly"
            >
              <Stack
                flexDirection="row"
                gap={10}
                border={0}
                justifyContent="start"
              >
                <Image source={require("../../../assets/img/avatar.png")} />
                <Text>500 XP</Text>
              </Stack>
              <Stack
                flexDirection="row"
                gap={10}
                border={0}
                justifyContent="start"
              >
                <Image source={require("../../../assets/img/avatar.png")} />
                <Text>5 Day Streak</Text>
              </Stack>
            </Stack>
          </Stack>
        </Center>
        <Center p={15}>
          <DeviceMotionView />
        </Center>
        <View style={{ width: "100%", height: 350 }}>
          {/* <Image source={require("../../../assets/img/mascot.png")} /> */}
          <Center>
            <LottieView
              autoPlay={false}
              ref={animation}
              progress={1}
              style={{
                width: "100%",
                height: "100%",
              }}
              source={require("../../animations/alien.json")}
            />
          </Center>
        </View>
        <Center>
          <SessionControl />
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

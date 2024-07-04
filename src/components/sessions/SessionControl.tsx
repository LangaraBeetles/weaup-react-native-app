import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SessionStatesType } from "@src/interfaces/session.types";
import Timer from "@src/components/ui/Timer";
import Button from "@src/components/ui/Button";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import {
  PostureSessionInput,
  PostureSessionRecord,
} from "@src/interfaces/posture.types";
import { saveSessionRecords } from "@src/services/sessionApi";
import { useUser } from "@src/state/useUser";

const SessionControl = () => {
  const sessionInterval = useRef<any>();
  const [sessionState, setSessionState] =
    useState<SessionStatesType["SessionStatesEnum"]>("STOP");
  const [timerState, setTimerState] =
    useState<SessionStatesType["TimerStatesEnum"]>("STOPPED");

  // const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  const [sessionPostureData, setSessionPostureData] = useState<
    Array<PostureSessionRecord>
  >([]);
  const [startDate, setStartDate] = useState<string>("");

  const router = useRouter();

  const currentPosture = useUser((state) => state.currentPosture);
  // const setTrackingEnabled = useUser((state) => state.setTrackingEnabled);
  const setSessionActive = useUser((state) => state.setSessionActive);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    // setSessionState("INIT");
    // setTimeout(() => {
    //   bottomSheetModalRef.current?.present();
    // }, 100); // Small delay to ensure state update and ref readiness
  }, []);

  const handleDismissModalPress = useCallback(() => {
    // bottomSheetModalRef.current?.dismiss();
  }, []);

  const onStartSession = (timeInHours: number, timeInMinutes: number) => {
    setSessionState("START");
    // setTimerState("RUNNING");
    // setTrackingEnabled(false);

    // setTimeInSeconds(timeInHours * 3600 + timeInMinutes * 60);
    setStartDate(new Date().toISOString());
    handleDismissModalPress();
    // TODO: update image animation
  };

  const onStopSession = () => {
    // setSessionState("PAUSE");
    // setTimerState("PAUSED");
    setModalVisible(true);
  };

  const onPauseSession = () => {
    // setSessionState((prevState) => (prevState === "START" ? "PAUSE" : "START"));
    // setTimerState((prevState) =>
    //   prevState === "RUNNING" ? "PAUSED" : "RUNNING",
    // );
  };

  const handleContinue = () => {
    // setModalVisible(false);
    // setSessionState("START");
    // setTimerState("RUNNING");
  };

  const handleEndSession = () => {
    // setModalVisible(false);
    // setSessionState("STOP");
    // setTimerState("STOPPED");
    // const payload: PostureSessionInput = {
    //   started_at: startDate,
    //   ended_at: new Date().toISOString(),
    //   records: sessionPostureData,
    // };
    // console.log({ payload });
    // saveSessionRecords(payload);
    // setSessionPostureData([]);
    // setSessionActive(false);
    // router.push("/session-summary");
    // setTimeInSeconds(-1);
  };

  console.log({ sessionState, sessionInterval });
  // useEffect(() => {
  //   // let interval: NodeJS.Timeout;

  //   const checkPosture = (_posture: any) => {
  //     console.log("Checking posture", _posture);
  //     const posture = {
  //       good_posture: currentPosture === "good",
  //       recorded_at: new Date().toISOString(),
  //     };
  //     setSessionPostureData((prevState) => [...prevState, posture]);
  //   };

  //   if (sessionState === "START" && timerState === "RUNNING") {
  //     console.log("interval", sessionInterval.current);
  //     sessionInterval.current = setInterval(
  //       (_state, _posture) => {
  //         console.log("interval", _state);
  //         checkPosture(_posture);
  //       },
  //       2000,
  //       sessionState,
  //       currentPosture,
  //     );
  //   }

  //   if (sessionState === "STOP") {
  //     if (sessionInterval.current) {
  //       clearInterval(sessionInterval.current);
  //     }
  //   }

  //   return () => {
  //     if (sessionInterval.current) {
  //       clearInterval(sessionInterval.current);
  //     }
  //   };
  // }, [sessionState, timerState, currentPosture, sessionInterval]);

  // useEffect(() => {
  //   if (sessionState === "START" && timeInSeconds === 0) {
  //     handleEndSession();
  //   } else if (sessionState === "START" && timeInSeconds > 0) {
  //     const timer = setInterval(() => {
  //       setTimeInSeconds((prevTime) => prevTime - 1);
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [timeInSeconds, sessionState]);

  return (
    <View>
      {/* {timerState === "STOPPED" && (
        <Button
          title="Start a session"
          onPress={handlePresentModalPress}
          variant="secondary"
          trailingIcon="play"
        />
      )} */}

      {/* {sessionState === "INIT" &&} */}

      <Timer
        onStartCallback={() => {
          console.log("started");
        }}
      />

      {/* {(sessionState === "START" || sessionState === "PAUSE") && (
        
      )} */}

      {/* <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text>Are you sure you want to end the session?</Text>
            <Button
              title="Keep Going"
              onPress={handleContinue}
              variant="primary"
            />
            <Button
              title="End Session"
              onPress={handleEndSession}
              variant="primary"
            />
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

// const SetTimer = ({
//   onStartSession,
// }: {
//   onStartSession: (timeInHours: number, timeInMinutes: number) => void;
// }) => {
//   // ref for BottomSheetModal
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
//   const [isTimerActive, setTimerActive] = useState<boolean>(false);
//   // variables
//   const snapPoints = useMemo(() => ["25%", "50%"], []);

//   const [timeInHours, setTimeInHours] = useState(0);
//   const [timeInMinutes, setTimeInMinutes] = useState(0);

//   const showTimeSetup = useCallback(() => {
//     // setSessionState("INIT");
//     setTimeout(() => {
//       bottomSheetModalRef.current?.present();
//     }, 100); // Small delay to ensure state update and ref readiness
//   }, []);

//   const stopTimer = () => {
//     setTimeInHours(0);
//     setTimeInMinutes(0);
//   };

//   return (
//     <View>
//       {isTimerActive ? (
//         <Timer
//           // timeInSeconds={timeInSeconds}
//           // handlePause={onPauseSession}
//           onStopCallback={stopTimer}
//           timeInSecondsValue={}
//           // isPaused={timerState === "PAUSED"}
//         />
//       ) : (
//         <Button
//           title="Start a session"
//           onPress={showTimeSetup}
//           variant="secondary"
//           trailingIcon="play"
//         />
//       )}

//       <BottomSheetModal
//         ref={bottomSheetModalRef}
//         index={1}
//         snapPoints={snapPoints}
//         backdropComponent={CustomBackdrop}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//           <View style={styles.bottomSheetContainer}>
//             <Text>Hours:</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setTimeInHours(Number(text))}
//               // value={timeInHours.toString()}
//               placeholder="Hours"
//               keyboardType="numeric"
//               defaultValue="0"
//             />
//             <Text>Minutes:</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setTimeInMinutes(Number(text))}
//               // value={timeInMinutes.toString()}
//               defaultValue="0"
//               placeholder="Minutes"
//               keyboardType="numeric"
//             />
//             <Button
//               title="Start Session"
//               onPress={() => {
//                 console.log({ timeInHours, timeInMinutes });
//                 if (timeInHours + timeInMinutes > 0) {
//                   onStartSession(timeInHours, timeInMinutes);
//                   setTimerActive(true);
//                   bottomSheetModalRef.current?.dismiss();
//                 }
//               }}
//               variant="primary"
//             />
//           </View>
//         </TouchableWithoutFeedback>
//       </BottomSheetModal>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default SessionControl;

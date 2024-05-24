import { NativeModules } from "react-native";
const { HeadphoneMotionManager } = NativeModules;

export default {
  startUpdates: () => HeadphoneMotionManager.startUpdates(),
  stopUpdates: () => HeadphoneMotionManager.stopUpdates(),
};

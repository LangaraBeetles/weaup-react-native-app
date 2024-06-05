import { DeviceMotion } from 'expo-sensors';

export const _subscribe = async () => {
    console.log("subscribe - motionreader");
    DeviceMotion.addListener((devicemotionData) => {
        if(devicemotionData.rotation){
            if(devicemotionData.rotation.beta > 1.2 || devicemotionData.rotation.beta < 1){
                console.log("bad"  + DeviceMotion.getListenerCount());

            } else {
                console.log("good"  + DeviceMotion.getListenerCount());

            }
        }
        
    });

    DeviceMotion.setUpdateInterval(1000);
};

export const _unsubscribe = () => {
    console.log("unsubscribe - motionreader");

    DeviceMotion.removeAllListeners();
};
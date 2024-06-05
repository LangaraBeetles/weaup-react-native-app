import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { useBackgroundTasks } from "@src/components/providers/BackgroundTasksProvider";
import * as Haptics from "expo-haptics";

export default function DeviceMotionView() {
    const [{beta, gamma, alpha }, setRotationData] = useState({beta: 0, gamma: 0, alpha: 0 });
    const [orientation, setOrientation] = useState(0);
    const [notification, setNotification] = useState(false);
    const showNotification = () => setNotification(true);
    const hideNotification = () => setNotification(false);
    const { isTrackingEnabled } = useBackgroundTasks();

    let listener;
    //Get RotationData
    useEffect(() => {
        if(isTrackingEnabled){
            _subscribe();
        } else {
            hideNotification();
        }
        return () => { _unsubscribe(); };
    }, [isTrackingEnabled]);

    //Get rotation and orientation values
    const _subscribe = async () => {
        console.log("subscribe - devicemotionview");
        listener = DeviceMotion.addListener((devicemotionData) => {
            if(devicemotionData.rotation){
                setRotationData(devicemotionData.rotation);
            }
            setOrientation(devicemotionData.orientation);
        });

        _setInterval();
    };

    const _unsubscribe = () => {
        console.log("unsubscribe - devicemotionview");
        DeviceMotion.removeAllListeners();
    };

    const _setInterval = () => {
        DeviceMotion.setUpdateInterval(1000);
    };

    //Provide feedback
    useEffect(()=>{
        if(beta < 0.03 && gamma < 0.03 ){   //device is on a flat surface
            hideNotification();
        }
        else
        {
            if(orientation == 0){
                if(beta > 1.2 || beta < 1){
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    console.log("Please check your posture." + DeviceMotion.getListenerCount());
                    showNotification();
                    return;
                } 
            } else {
                if(gamma > 1.2 || gamma < 1){
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    console.log("Please check your posture."  + DeviceMotion.getListenerCount());
                    showNotification();
                    return;
                }
            }
            hideNotification();
        }
    },[beta, gamma])

    return (
        <View>
            <Text style={{ display: notification ? 'flex' : 'none' }}>Please check your posture.</Text>
        </View>
    );
}
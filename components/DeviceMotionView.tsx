import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DeviceMotion, Accelerometer, Gyroscope } from 'expo-sensors';

export default function DeviceMotionView() {
    const [{beta, gamma, alpha }, setRotationData] = useState({beta: 0, gamma: 0, alpha: 0 });
    const [orientation, setOrientation] = useState(0);
    const [status, setStatus] = useState("");

    //Get RotationData
    useEffect(() => {
        _subscribe();
        return () => { _unsubscribe(); };
    }, []);

    const _setInterval = () => {
        DeviceMotion.setUpdateInterval(500);
    };

    //Provide feedback
    useEffect(()=>{
        if(beta < 0.03 && gamma < 0.03 ){   //device is on a flat surface
            setStatus("");
        }
        else
        {
            if(orientation == 0){
                if(beta > 1.2 || beta < 1){
                    setStatus(`Please check your posture`);
                    return;
                } 
            } else {
                if(gamma > 1.2 || gamma < 1){
                    setStatus(`Please check your posture`);
                    return;
                }
            }
            setStatus("");
        }
    },[beta, gamma])

    //Get rotation and orientation values
    const _subscribe = async () => {
        DeviceMotion.addListener((devicemotionData) => {
            setRotationData(devicemotionData.rotation);
            setOrientation(devicemotionData.orientation);
        });

        _setInterval();
    };

    const _unsubscribe = () => {
        DeviceMotion.removeAllListeners();
    };

    return (
        <View>
            <Text>{status}</Text>
            <Text>x: {beta}</Text>
            <Text>y: {gamma}</Text>
            <Text>z: {alpha}</Text>
        </View>
    );
}
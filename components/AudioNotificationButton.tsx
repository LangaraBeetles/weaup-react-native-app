import React from 'react';
import { View, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioNotificationButton() {
  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../assets/audio/oh_hello.mp3'));
      await sound.playAsync();
      // Unload the sound from memory after playing it is important because it will imporve the app performance and save battery from the phone.
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Error', 'Failed to play sound.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function NotificationsScreen() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de notificações negada!');
      return;
    }
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação de teste",
        body: "Essa é uma notificação local",
      },
      trigger: { seconds: 1 },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Enviar Notificação" onPress={sendNotification} />
    </View>
  );
}

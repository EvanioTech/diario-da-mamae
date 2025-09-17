import React, { useEffect } from 'react';
import { Button, View, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configura notificações para Android
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  // Solicita permissão de notificações
  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de notificações negada!');
    }

    // Configura canal padrão no Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  // Envia notificação local
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notificação de teste",
        body: "Essa é uma notificação local no Expo Go",
      },
      trigger: { seconds: 5 }, // dispara em 5 segundos
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Enviar Notificação" onPress={sendNotification} />
    </View>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';




export default function RootLayout() {


  return (
    <>
      <Stack 
      initialRouteName='splash'
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index"  />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="signIn" />

      </Stack>
      </>
      

   
  );
}

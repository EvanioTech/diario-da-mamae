
import { Stack } from 'expo-router';
import 'react-native-reanimated';




export default function RootLayout() {


  return (
    <>
      <Stack 
      initialRouteName='splashScreen'
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index"  />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="signIn" />
        

      </Stack>
      </>
      

   
  );
}

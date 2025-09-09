import { View,Text,Image } from "react-native";

export default function Index() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={require('../assets/images/g.png')} style={{width:200,height:200,marginBottom:20}} />
      <Text style={{fontSize:24,fontWeight:'bold'}}>Welcome to the App!</Text>
        <Text style={{fontSize:16,color:'#666'}}>This is the main entry point of the application.</Text>
    </View>
  );
}
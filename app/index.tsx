import { View,Text,Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";


export default function Index() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',}}>
      <Image source={require('../assets/images/gr.png')} style={{width:'90%',height:350,marginBottom:20, borderRadius: 20}} />
      <Text style={{fontSize:24,fontWeight:'bold'}}>Seja Bem vinda Mamãe!</Text>
        <Text style={{fontSize:16,color:'#666',marginBottom:20}}>Seu diário digital para acompanhar sua jornada.</Text>
        <TouchableOpacity
        onPress={() => router.push('/signUp')}
         style={{backgroundColor:'#cc11a3ff',padding:12,borderRadius:8,width:'50%',alignItems:'center', marginTop:20}}>
          <Text style={{color:'#fff',fontWeight:'bold'}}>Começar</Text>
        </TouchableOpacity>
    </View>
  );
}
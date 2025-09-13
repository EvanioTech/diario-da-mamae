import { View, Text, Button, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
      <Text style={{ fontSize: 24, fontWeight: "bold",  }}>Meu Perfil</Text>
      <TouchableOpacity 
      style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      marginBottom:20,
                      marginTop:70,
                      
                      flexDirection:'row',
                      }}
      onPress={() => router.push("/profile/edit")}>
        <Text style={{ fontSize: 18, color: "#f55bd3ff" }}>Editar Perfil</Text>
        <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
      </TouchableOpacity>
      <TouchableOpacity style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      marginBottom:20,
                      marginTop:20,
                      
                      flexDirection:'row',
                      }} onPress={() => router.push("/profile/report")}>
        <Text style={{ fontSize: 18, color: "#f55bd3ff" }}>Relatar Problema</Text>
        <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
      </TouchableOpacity>
    </View>
  );
}
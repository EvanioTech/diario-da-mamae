import { View, Text, Button, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
      <Text style={{ fontSize: 24, fontWeight: "bold",  }}>Meu Perfil</Text>
      <TouchableOpacity 
      style={{ marginTop: 20, backgroundColor:'#f55bd3ff', padding:10, borderRadius:8, width:'90%', alignItems:'center' }}
      onPress={() => router.push("/profile/edit")}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 20, backgroundColor:'#f55bd3ff', padding:10, borderRadius:8, width:'90%', alignItems:'center' }} onPress={() => router.push("/profile/report")}>
        <Text style={{ fontSize: 18, color: "#fff" }}>Relatar Problema</Text>
      </TouchableOpacity>
    </View>
  );
}
import { View, Text, Button, TouchableOpacity } from "react-native";
import { router, useFocusEffect } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import {db, initDB,getFirstAsync, runAsync} from '../../../db/db';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  senha: string;
  babyName: string;
};

export default function Profile() {
const [user, setUser] = useState<User | null>(null);


  const fetchData = async () => {
    try {
      await initDB();
      const name = await AsyncStorage.getItem("usuarioLogado");
      if (!name) return;

      const email = await AsyncStorage.getItem("emailUsuarioLogado");
      if (!email) return;

      const usuario = await getFirstAsync<User>(
        "SELECT * FROM users WHERE name = ? AND email = ?",
        [name, email]
      );
      if (usuario) {
        setUser(usuario);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    router.replace("/signIn");
  };

  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fa0fb3ff" }}>Meu Perfil</Text>
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
        <AntDesign name="edit" size={28} color="#fa0fb3ff" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
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
        <AntDesign name="bug" size={28} color="#fa0fb3ff" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
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
                      }} onPress={() => router.push("/profile/camera")}>
        <Text style={{ fontSize: 18, color: "#f55bd3ff" }}>Camera</Text>
        <AntDesign name="camera" size={28} color="#fa0fb3ff" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#fa0fb3ff",
          padding: 12,
          borderRadius: 8,
          width: "50%",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sair</Text>
      </TouchableOpacity>
      <View style={{ position: "absolute", bottom: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: "#999" }}>App desenvolvido por Octadroid</Text>
        <Text style={{ fontSize: 12, color: "#999" }}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}
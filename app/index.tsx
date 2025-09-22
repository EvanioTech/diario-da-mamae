import { View,Text,Image, TouchableOpacity, ActivityIndicator } from "react-native";
import {  router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Index() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const usuario = await AsyncStorage.getItem("usuarioLogado");

        if (usuario) {
          // Se já tem usuário salvo, pula a tela inicial e vai para o app
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Erro ao verificar login:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#f80eec" />
      </View>
    );
  }








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
      <StatusBar style="dark" />
    </View>
  );
}
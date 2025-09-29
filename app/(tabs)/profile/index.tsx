import { View, Text, Button, TouchableOpacity, Image, Alert , StyleSheet} from "react-native";
import { router, useFocusEffect } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
// Ajustado o caminho de importação do db
import {db, initDB,getFirstAsync, runAsync, updateUserProfile} from '../../../db/db';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

// A type User deve espelhar as colunas do seu DB, incluindo 'bio' e 'photoUri'
type User = {
  id: number;
  name: string;
  email: string;
  senha: string;
  babyName: string;
  bio: string | null;       
  photoUri: string | null;  
};

export default function Profile() {
const [user, setUser] = useState<User | null>(null);
const [photoUri, setPhotoUri] = useState<string | null>(null);


  const fetchData = async () => {
    try {
      await initDB();
      
      // Armazenamento incorreto: A chave "usuarioLogado" guarda o EMAIL (vindo do edit.tsx/login)
      const emailLogadoPelaChaveErrada = await AsyncStorage.getItem("usuarioLogado");
      // Armazenamento correto: A chave "emailUsuarioLogado" também guarda o EMAIL
      const emailOficial = await AsyncStorage.getItem("emailUsuarioLogado");
      
      // Usaremos o emailOficial para buscar, garantindo que o usuário está logado
      const finalEmail = emailOficial || emailLogadoPelaChaveErrada; 
      
      if (!finalEmail) { 
        // O warning aqui só deveria aparecer se realmente não houvesse login
        console.warn("Usuário não logado no AsyncStorage. Redirecionando ou exibindo tela de login.");
        return;
      }


      // FIX: Consulta simplificada usando apenas o email, já que ele é UNIQUE e é o que temos.
      const usuario = await getFirstAsync<User>(
        "SELECT * FROM users WHERE email = ?",
        [finalEmail]
      );
      
      if (usuario) {
        setUser(usuario);
        // Define o estado photoUri com o valor do banco de dados
        setPhotoUri(usuario.photoUri ?? null); 
      } else {
         console.warn("Usuário logado no AsyncStorage mas não encontrado no DB. Necessário relogar.");
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
    await AsyncStorage.removeItem("emailUsuarioLogado");
    router.replace("/signIn");
  };

  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fa0fb3ff", marginBottom: 20 }}>Meu Perfil</Text>


      
              {/* O estado photoUri agora carrega o valor do banco de dados */}
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.profilePhoto} />
              ) : (
                <View style={styles.profilePhotoPlaceholder}>
                  <AntDesign name="user" size={49} color="#fff" />
                </View>
              )}
            
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
                      marginTop:50,
                      
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
                      marginTop:5,
                      
                      flexDirection:'row',
                      }} onPress={() => router.push("/profile/report")}>
        <Text style={{ fontSize: 18, color: "#f55bd3ff" }}>Relatar Problema</Text>
        <AntDesign name="bug" size={28} color="#fa0fb3ff" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
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


const styles = StyleSheet.create({
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  profilePhotoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fa0fb3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
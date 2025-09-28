import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, ActionSheetIOS, Platform } from 'react-native';
import { initDB, getFirstAsync, updateUserProfile } from '@/db/db'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 

type User = {
  id: number;
  name: string;
  email: string;
  bio?: string;
  photoUri?: string; 
};

const EditProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null); 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      await initDB(); 

      const emailLogado = await AsyncStorage.getItem('usuarioLogado');
      if (!emailLogado) return;

      const usuario = await getFirstAsync<User>(
        'SELECT * FROM users WHERE email = ?',
        [emailLogado]
      );

      if (usuario) {
        setUser(usuario);
        setName(usuario.name);
        setEmail(usuario.email);
        setBio(usuario.bio ?? '');
        setPhotoUri(usuario.photoUri ?? null); 
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const launchImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de permissão para usar a câmera!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handlePickImage = () => {
    if (!user) { // Adiciona a checagem aqui também, já que a ação é só para usuários logados.
      Alert.alert('Acesso Negado', 'Você precisa estar logado para alterar o perfil.');
      return;
    }

    const options = ['Tirar Foto', 'Escolher da Galeria', 'Cancelar'];
    
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: options,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            launchCamera();
          } else if (buttonIndex === 1) {
            launchImageLibrary();
          }
        }
      );
    } else {
      Alert.alert('Escolha uma opção', '', [
        { text: 'Tirar Foto', onPress: launchCamera },
        { text: 'Escolher da Galeria', onPress: launchImageLibrary },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    }
  };


  const handleSave = async () => {
    // CORREÇÃO: Se o usuário não existe, emite um alerta e retorna.
    if (!user) {
      Alert.alert('Acesso Negado', 'Você precisa estar logado para salvar as alterações.');
      return; 
    }
    
    try {
      await updateUserProfile(
        user.id,
        name,
        email,
        bio,
        photoUri
      );
      Alert.alert('Perfil atualizado!', 'Suas informações foram salvas.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      {/* --- SEÇÃO DA FOTO --- */}
      <TouchableOpacity onPress={handlePickImage} style={styles.photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.profilePhotoPlaceholder}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePickImage}>
         <Text style={styles.changePhotoText}>
            {photoUri ? 'Trocar Foto' : 'Adicionar Foto'}
         </Text>
      </TouchableOpacity>
      {/* --- FIM SEÇÃO DA FOTO --- */}

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
        placeholderTextColor={'#999'}
        editable={!!user} // Desabilita edição se não houver usuário logado
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={'#999'}
        editable={!!user} // Desabilita edição se não houver usuário logado
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Fale um pouco sobre você"
        multiline
        numberOfLines={4}
        placeholderTextColor={'#999'}
        editable={!!user} // Desabilita edição se não houver usuário logado
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={{ color: '#ff69b4', fontWeight: 'bold', fontSize: 20 }}>
          {user ? 'Salvar' : 'Fazer Login para Salvar'}
        </Text>
      </TouchableOpacity>
      
      {/* Botão para remover a foto */}
      {(photoUri && user) && ( // Só mostra se tiver foto E usuário logado
        <TouchableOpacity 
          onPress={() => setPhotoUri(null)} 
          style={styles.removeButton}
        >
          <Text style={{ color: 'red', fontWeight: 'bold' }}>
            Remover Foto
          </Text>
        </TouchableOpacity>
      )}


      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        {user ? '': 'Acesso Visitante'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 18,
    textAlign: 'center',
    color: '#ff69b4'
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 8,
  },
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
    backgroundColor: '#ff69b4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#fff',
    padding: 12, 
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#ff69b4',
    borderWidth: 2,
    marginTop: 18, 
    width: '80%',
    alignSelf: 'center',
  },
  removeButton: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 5,
  }
});

export default EditProfileScreen;
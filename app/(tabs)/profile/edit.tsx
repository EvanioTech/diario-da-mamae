import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { initDB, getFirstAsync } from '@/db/db';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: number;
  name: string;
  email: string;
  bio?: string;
};

const EditProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      await initDB();

      // Recupera o email salvo no login
      const emailLogado = await AsyncStorage.getItem('usuarioLogado');
      if (!emailLogado) return;

      // Busca usuário pelo email
      const usuario = await getFirstAsync<User>(
        'SELECT * FROM users WHERE email = ?',
        [emailLogado]
      );

      if (usuario) {
        setUser(usuario);
        setName(usuario.name);
        setEmail(usuario.email);
        setBio(usuario.bio ?? '');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const handleSave = () => {
    // TODO: Implementar update no banco se quiser salvar mudanças
    Alert.alert('Perfil atualizado!', 'Suas informações foram salvas.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Seu nome"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Fale um pouco sobre você"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={{ color: '#ff69b4', fontWeight: 'bold', fontSize: 20 }}>
          Salvar
        </Text>
      </TouchableOpacity>

      {/* Mostra o nome do usuário carregado */}
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Usuário logado: {user?.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
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
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#ff69b4',
    borderWidth: 2,
    marginTop: 14,
    width: '80%',
    alignSelf: 'center',
  },
});

export default EditProfileScreen;

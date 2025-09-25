// SignUp.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {  router } from 'expo-router';
import {db, initDB, getFirstAsync} from '../db/db';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Initialize the database when the app starts

interface User {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    babyName: string;
}

const SignUp = () => {
    const [name, setName] = useState('');
    const [babyName, setBabyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        initDB();
    }, []);

    const handleSignUp = async () => {
  if (!name || !babyName || !email || !password || !confirmPassword) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    return;
  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 

if (!emailRegex.test(email)) {
  Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
  return;
}

  if (password.length < 4) {
    Alert.alert('Erro', 'A senha deve ter pelo menos 4 caracteres.');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Erro', 'As senhas não coincidem.');
    return;
  }

  try {
    await db.runAsync(
      'INSERT INTO users (name, email, senha, babyName) VALUES (?, ?, ?, ?);',
      [name, email, password, babyName]
    );

    const usuario: User | null = await getFirstAsync<User>(
      `SELECT * FROM users WHERE email = ? AND senha = ?`,
      [email, password]
    );

    if (!usuario) {
      Alert.alert('Erro', 'Não foi possível recuperar o usuário cadastrado.');
      return;
    }

    await AsyncStorage.setItem('usuarioLogado', email);

    Alert.alert('Sucesso', 'Conta criada com sucesso!');
    router.push('/(tabs)');
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível realizar o cadastro. Tente novamente.');
    console.error(error);
  }
};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                placeholderTextColor={'#999'}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do bebê"
                placeholderTextColor={'#999'}
                value={babyName}
                onChangeText={setBabyName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={'#999'}
            />
            <TextInput
                style={[styles.input, { color: 'pink' }]}
                placeholder="Senha"
                placeholderTextColor={'#999'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={[styles.input, { color: 'pink' }]}
                placeholder="Confirme a Senha"
                placeholderTextColor={'#999'}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TouchableOpacity
                style={{ backgroundColor: '#f539ccff', padding: 12, borderRadius: 8, width: '60%', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}
                onPress={handleSignUp}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 20, textAlign: 'center' }}>Já tem uma conta? <Text style={{ color: '#cc11a3ff', fontWeight: 'bold' }} onPress={() => router.push('/signIn')}>Entrar</Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
    },
});

export default SignUp;
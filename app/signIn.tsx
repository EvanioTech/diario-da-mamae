import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db } from '@/db/db';
import {  router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


type User = {
                id: number;
                email: string;
                senha: string;
                // add other fields as needed
            };



const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        // Replace this with your authentication logic
        if (email === '' || password === '') {
            Alert.alert('Erro', 'Preencha todos os campos.');
            setLoading(false);
            return;
        }
        try {
            
            
            const user: User | null = await db.getFirstSync(
                'SELECT * FROM users WHERE email = ? AND senha = ?',
                [email, password]
            );
            if (user) {
                await AsyncStorage.setItem('usuarioLogado', email);
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                router.push('/(tabs)');
            } else {
                Alert.alert('Erro', 'Credenciais inválidas.');
            }
        }
        catch (error) {
            console.error('Erro ao fazer login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrar</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: '#f539ccff',
                    padding: 12,
                    borderRadius: 8,
                    width: '60%',
                    alignItems: 'center',
                    marginTop: 20,
                    alignSelf: 'center',
                }}
                onPress={handleSignIn}
                disabled={loading}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 20, alignSelf: 'center', borderColor: '#f539ccff', borderWidth: 1, padding: 10, borderRadius: 8 }}
                onPress={() => router.push('/(tabs)')}
            >
                <Text style={{ color: '#f539ccff' }}>Entrar como visitante</Text>
            </TouchableOpacity>
            
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
    },
});

export default SignIn;
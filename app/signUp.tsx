import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Touchable, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Link, router} from 'expo-router';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Replace with your sign-up logic (API call, validation, etc.)
        if (!name || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do bebê"
                value={name}
                onChangeText={setName}
            />
            
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirme a Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity 
            style={{backgroundColor:'#f539ccff',padding:12,borderRadius:8,width:'60%',alignItems:'center', marginTop:20,  alignSelf:'center'}} 
            onPress={() => router.push('/(tabs)')}
            >
              <Text style={{color:'#fff', fontWeight:'bold'}}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={{marginTop:20}}>Já tem uma conta? <Text style={{color:'#cc11a3ff', fontWeight:'bold'}} onPress={() => router.push('/signIn')}>Entrar</Text></Text>
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

export default SignUp;
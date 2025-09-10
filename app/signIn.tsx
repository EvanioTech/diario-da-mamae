import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Falha ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

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
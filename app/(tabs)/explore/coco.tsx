import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

const CocoPage = () => {
    const [hora, setHora] = useState('');
    const [descricao, setDescricao] = useState('');

    const registrarCoco = () => {
        if (!hora) {
            Alert.alert('Por favor, informe o horário.');
            return;
        }
        // Aqui você pode salvar os dados em um banco de dados ou estado global
        Alert.alert('Registro salvo!', `Horário: ${hora}\nDescrição: ${descricao}`);
        setHora('');
        setDescricao('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Cocô do Bebê</Text>
            <TextInput
                style={styles.input}
                placeholder="Horário (ex: 14:30)"
                value={hora}
                onChangeText={setHora}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição (cor, consistência, etc)"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />
            <Button title="Registrar" onPress={registrarCoco} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
});

export default CocoPage;
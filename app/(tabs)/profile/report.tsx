import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ReportBugScreen = () => {
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        if (!description.trim()) {
            Alert.alert('Erro', 'Por favor, descreva o bug.');
            return;
        }
        // Aqui você pode enviar o relatório para seu backend ou serviço de email
        Alert.alert('Obrigado!', 'Seu relatório foi enviado.');
        setDescription('');
        setEmail('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reportar um Bug</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu e-mail (opcional)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva o bug encontrado..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
            />
            <Button title="Enviar" onPress={handleSubmit} />
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default ReportBugScreen;
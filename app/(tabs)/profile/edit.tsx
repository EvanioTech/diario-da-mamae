import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';

const EditProfileScreen = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        // TODO: Implement save logic (e.g., API call)
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
            <Button title="Salvar" onPress={handleSave} />
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
});

export default EditProfileScreen;
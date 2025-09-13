import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Exemplo de dados dos remédios
const remedios = [
    { id: '1', nome: 'Paracetamol', horario: '08:00', dose: '5ml' },
    { id: '2', nome: 'Ibuprofeno', horario: '14:00', dose: '3ml' },
    { id: '3', nome: 'Amoxicilina', horario: '20:00', dose: '4ml' },
];

const RemediosPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Remédios Tomados</Text>
            <FlatList
                data={remedios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.remedioItem}>
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.info}>Horário: {item.horario}</Text>
                        <Text style={styles.info}>Dose: {item.dose}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhum remédio registrado.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    remedioItem: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    nome: {
        fontSize: 18,
        fontWeight: '600',
    },
    info: {
        fontSize: 16,
        color: '#555',
    },
});

export default RemediosPage;
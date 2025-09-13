import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Exemplo de dados de banhos
const banhos = [
    { id: '1', data: '2024-06-01', hora: '08:00', observacao: 'Banho tranquilo' },
    { id: '2', data: '2024-06-02', hora: '19:30', observacao: 'Chorou um pouco' },
    { id: '3', data: '2024-06-03', hora: '07:45', observacao: 'Gostou da água morna' },
];

const BanhoPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Banhos do Bebê</Text>
            <FlatList
                data={banhos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.banhoItem}>
                        <Text style={styles.dataHora}>{item.data} às {item.hora}</Text>
                        <Text style={styles.observacao}>{item.observacao}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>Nenhum banho registrado.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 26, backgroundColor: '#fff', justifyContent: 'center', paddingTop: 160  },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
    banhoItem: { marginBottom: 16, padding: 12, backgroundColor: '#f0f0f0', borderRadius: 8 },
    dataHora: { fontSize: 16, fontWeight: '600' },
    observacao: { fontSize: 14, color: '#555' },
});

export default BanhoPage;
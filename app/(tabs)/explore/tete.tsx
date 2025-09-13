import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

type Feeding = {
    id: string;
    time: string;
    side: 'Esquerda' | 'Direita';
};

export default function TetePage() {
    const [feedings, setFeedings] = useState<Feeding[]>([]);

    const addFeeding = (side: 'Esquerda' | 'Direita') => {
        const now = new Date();
        setFeedings([
            {
                id: now.getTime().toString(),
                time: now.toLocaleTimeString(),
                side,
            },
            ...feedings,
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mamadas Registradas</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#8ecae6' }]}
                    onPress={() => addFeeding('Esquerda')}
                >
                    <Text style={styles.buttonText}>Mama Esquerda</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ffb703' }]}
                    onPress={() => addFeeding('Direita')}
                >
                    <Text style={styles.buttonText}>Mama Direita</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={feedings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.feedingItem}>
                        <Text>
                            {item.time} - {item.side}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma mamada registrada ainda.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    button: { padding: 15, borderRadius: 8 },
    buttonText: { color: '#222', fontWeight: 'bold' },
    feedingItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
    emptyText: { textAlign: 'center', color: '#888', marginTop: 40 },
});
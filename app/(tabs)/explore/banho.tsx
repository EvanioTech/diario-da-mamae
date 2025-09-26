import React, { useState, useEffect, use, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { getAllEventos, deleteEvento, updateEvento, initDB } from '../../../db/db'; // ajuste o caminho
import { styles } from '../../../helpers/banho.tab.styles';

type Evento = {
  id: number;
  key_evento: string;
  data: string;
};

export default function BanhoPage() {
  const [feedings, setFeedings] = useState<Evento[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchFeedings();
    }, [])
  );

  // Carrega do banco ao abrir a tela
    useEffect(() => {
    initDB();
  }, []);
  const fetchFeedings = async () => {
    try {
      const eventos = await getAllEventos();
      const cuidados = eventos.filter((e: Evento) =>
        ['Banho', 'Hidratou', 'Cortou as unhas', 'Cortou o cabelo'].includes(e.key_evento)
      );
      setFeedings(cuidados);
    } catch (e) {
      console.error('Erro ao buscar cuidados:', e);
    }
  };

  useEffect(() => {
    fetchFeedings();
  }, []);

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const data = date.toLocaleDateString('pt-BR');
    const hora = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${data} ${hora}`;
  };

  const handleDelete = (id: number) => {
    Alert.alert('Excluir evento', 'Tem certeza que deseja excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteEvento(id);
          await fetchFeedings();
        },
      },
    ]);
  };

  const handleEdit = (evento: Evento) => {
    setEditingId(evento.id);
    setEditedValue(evento.key_evento);
    setEditModalVisible(true);
  };

  const confirmEdit = async () => {
    if (editingId !== null && editedValue.trim()) {
      await updateEvento(editingId, editedValue.trim());
      setEditModalVisible(false);
      setEditingId(null);
      setEditedValue('');
      await fetchFeedings();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuidados Registrados</Text>

      <FlatList
        data={feedings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.feedingItem}>
            <View style={{ flex: 1 }}>
              <Text>
                {formatDateTime(item.data)} - {item.key_evento}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
              <Text style={{ color: '#0077cc' }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
              <Text style={{ color: '#cc0000' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma Alimentação registrada ainda.</Text>
        }
      />

      {/* Modal de Edição */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar evento</Text>
            <TextInput
              value={editedValue}
              onChangeText={setEditedValue}
              style={styles.input}
              placeholder="Novo nome do evento"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelBtn}>
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmEdit} style={styles.saveBtn}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}



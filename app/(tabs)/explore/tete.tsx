import React, { useState, useEffect, useCallback } from 'react';
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

type Evento = {
  id: number;
  key_evento: string;
  data: string;
};

// Novo tipo para os dados agrupados por dia
type GroupedEventos = {
  title: string; // Ex: "Sexta-feira, 27 de Setembro"
  data: Evento[];
};

export default function TetePage() {
  // Alterado para armazenar os eventos AGRUPADOS
  const [groupedFeedings, setGroupedFeedings] = useState<GroupedEventos[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Novo estado para controlar quais dias estão abertos (expandidos)
  const [expandedDays, setExpandedDays] = useState<string[]>([]); 

  useFocusEffect(
    useCallback(() => {
      fetchFeedings();
    }, [])
  );

  // Carrega do banco ao abrir a tela
  useEffect(() => {
    initDB();
  }, []);

  // Função auxiliar para formatar a data como título de seção
  const formatDayTitle = (dateString: string) => {
    const date = new Date(dateString);
    // Formato: "Dia da semana, XX de Mês"
    return date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: '2-digit', 
        month: 'long' 
    });
  };

  // Função auxiliar para formatar a hora
  const formatTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Função que agrupa e formata os dados
  const groupEventsByDay = (eventos: Evento[]): GroupedEventos[] => {
    const groups: { [key: string]: Evento[] } = {};

    eventos.forEach(evento => {
      // Cria uma chave no formato YYYY-MM-DD para agrupar
      const dateKey = evento.data.substring(0, 10); 
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(evento);
    });

    // Converte o objeto agrupado em um array formatado
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Ordena por data (mais recente primeiro)
      .map(dateKey => ({
        title: formatDayTitle(groups[dateKey][0].data),
        data: groups[dateKey],
      }));
  };

  const fetchFeedings = async () => {
    try {
      const eventos = await getAllEventos();
      const alimentacoes = eventos.filter((e: Evento) =>
        ['Tete', 'Fórmula', 'Mingau', 'Frutas'].includes(e.key_evento)
      );
      
      // Armazena os dados agrupados
      setGroupedFeedings(groupEventsByDay(alimentacoes));
      
    } catch (e) {
      console.error('Erro ao buscar alimentações:', e);
    }
  };

  useEffect(() => {
    fetchFeedings();
  }, []);


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
  
  // Função para expandir/recolher o dia
  const toggleDayExpansion = (dayTitle: string) => {
    if (expandedDays.includes(dayTitle)) {
      setExpandedDays(expandedDays.filter(day => day !== dayTitle));
    } else {
      setExpandedDays([...expandedDays, dayTitle]);
    }
  };

  // Renderiza um único item da FlatList (que será um dia inteiro)
  const renderItem = ({ item }: { item: GroupedEventos }) => {
    const isExpanded = expandedDays.includes(item.title);

    return (
      <View style={styles.dayContainer}>
        {/* Título do dia (sempre visível) */}
        <TouchableOpacity onPress={() => toggleDayExpansion(item.title)} style={styles.dayHeader}>
          <Text style={styles.dayTitle}>{item.title} ({item.data.length})</Text>
          <Text style={styles.toggleText}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Lista de eventos (visível apenas se expandido) */}
        {isExpanded && item.data.map((evento) => (
          <View key={evento.id} style={styles.feedingItem}>
            <View style={{ flex: 1 }}>
              <Text>
                {formatTime(evento.data)} - {evento.key_evento}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(evento)} style={styles.actionButton}>
              <Text style={{ color: '#0077cc' }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(evento.id)} style={styles.actionButton}>
              <Text style={{ color: '#cc0000' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Alimentações Registradas</Text>

      <FlatList
        data={groupedFeedings}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#fff', paddingTop: 160 },
  mainTitle: { // Alterado de 'title' para 'mainTitle' para diferenciar dos títulos de dia
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff69b4',
  },
  dayContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9', // Fundo leve para o cabeçalho
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077cc',
  },
  feedingItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  actionButton: {
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: '#0077cc',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
});
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
import { styles as importedStyles } from '../../../helpers/banho.tab.styles'; // Importa estilos base

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

export default function BanhoPage() {
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
        data: groups[dateKey].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()), // Ordena os eventos dentro do dia
      }));
  };

  const fetchFeedings = async () => {
    try {
      const eventos = await getAllEventos();
      const cuidados = eventos.filter((e: Evento) =>
        ['Banho', 'Hidratou', 'Cortou as unhas', 'Cortou o cabelo'].includes(e.key_evento)
      );
      // Armazena os dados agrupados
      setGroupedFeedings(groupEventsByDay(cuidados));
      
    } catch (e) {
      console.error('Erro ao buscar cuidados:', e);
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
      <View style={localStyles.dayContainer}>
        {/* Título do dia (sempre visível) */}
        <TouchableOpacity onPress={() => toggleDayExpansion(item.title)} style={localStyles.dayHeader}>
          <Text style={localStyles.dayTitle}>{item.title} ({item.data.length})</Text>
          <Text style={localStyles.toggleText}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Lista de eventos (visível apenas se expandido) */}
        {isExpanded && item.data.map((evento) => (
          <View key={evento.id} style={localStyles.feedingItem}>
            <View style={{ flex: 1 }}>
              <Text>
                {formatTime(evento.data)} - {evento.key_evento}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(evento)} style={localStyles.actionButton}>
              <Text style={{ color: '#0077cc' }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(evento.id)} style={localStyles.actionButton}>
              <Text style={{ color: '#cc0000' }}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };


  return (
    <View style={importedStyles.container}>
      <Text style={importedStyles.title}>Cuidados Registrados</Text>

      <FlatList
        data={groupedFeedings}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={importedStyles.emptyText}>Nenhum Cuidado registrado ainda.</Text>
        }
      />

      {/* Modal de Edição (mantendo os estilos originais) */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={importedStyles.modalContainer}>
          <View style={importedStyles.modalContent}>
            <Text style={importedStyles.modalTitle}>Editar evento</Text>
            <TextInput
              value={editedValue}
              onChangeText={setEditedValue}
              style={importedStyles.input}
              placeholder="Novo nome do evento"
            />
            <View style={importedStyles.modalButtons}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={importedStyles.cancelBtn}>
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmEdit} style={importedStyles.saveBtn}>
                <Text style={{ color: '#fff' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Estilos específicos para o agrupamento, para evitar conflito com os estilos importados
const localStyles = StyleSheet.create({
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
    backgroundColor: '#f9f9f9',
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
  // Reutilizando o estilo do item, mas com cores adaptadas para ficar dentro do container
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
});
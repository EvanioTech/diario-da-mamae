import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from 'expo-router';

import {
  getEventosCoco,
  updateEventoCoco,
  deleteEvento
} from '../../../db/db'; 

type EventoCoco = {
  id: number;
  key_evento: string;
  data: string;
  descricao: string | null;
  imagemUri: string | null;
};

// Novo tipo para os dados agrupados por dia
type GroupedEventos = {
  title: string; // Ex: "Sexta-feira, 27 de Setembro"
  data: EventoCoco[];
};


const CocoPage = () => {
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  // Alterado para armazenar os eventos AGRUPADOS
  const [groupedEventos, setGroupedEventos] = useState<GroupedEventos[]>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingEvento, setEditingEvento] = useState<EventoCoco | null>(null);
  const [viewImageModalVisible, setViewImageModalVisible] = useState(false);
  const [viewImageUri, setViewImageUri] = useState<string | null>(null);
  
  // Novo estado para controlar quais dias estão abertos (expandidos)
  const [expandedDays, setExpandedDays] = useState<string[]>([]); 

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
  const groupEventsByDay = (eventos: EventoCoco[]): GroupedEventos[] => {
    const groups: { [key: string]: EventoCoco[] } = {};

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

  const carregarEventos = async () => {
    const ev = await getEventosCoco(); 
    // Armazena os dados agrupados
    setGroupedEventos(groupEventsByDay(ev));
  };

  // Atualiza sempre que a tela voltar a ser visível
  useFocusEffect(
    useCallback(() => {
      carregarEventos();
    }, [])
  );
  
  // Efeito para carregar os eventos na montagem inicial
  useEffect(() => {
    carregarEventos();
  }, []);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária para acessar as imagens.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5
    });
    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária para usar a câmera.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5
    });
    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const iniciarEdicao = (evento: EventoCoco) => {
    setEditingEvento(evento);
    setDescricao(evento.descricao ?? '');
    setImagemUri(evento.imagemUri ?? null);
    setEditModalVisible(true);
  };

  const confirmarEdicao = async () => {
    if (!editingEvento) return;
    try {
      await updateEventoCoco(editingEvento.id, descricao, imagemUri);
      setEditModalVisible(false);
      setEditingEvento(null);
      setDescricao('');
      setImagemUri(null);
      carregarEventos();
      Alert.alert('Registro atualizado!');
    } catch (e) {
      console.error(e);
      Alert.alert('Erro ao atualizar registro.');
    }
  };

  const confirmarExclusao = (id: number) => {
    Alert.alert('Excluir registro', 'Deseja realmente excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteEvento(id);
          carregarEventos();
        }
      }
    ]);
  };

  const abrirModalImagem = (uri: string) => {
    setViewImageUri(uri);
    setViewImageModalVisible(true);
  };

  const fecharModalImagem = () => {
    setViewImageUri(null);
    setViewImageModalVisible(false);
  };
  
  // Função para expandir/recolher o dia
  const toggleDayExpansion = (dayTitle: string) => {
    if (expandedDays.includes(dayTitle)) {
      setExpandedDays(expandedDays.filter(day => day !== dayTitle));
    } else {
      setExpandedDays([...expandedDays, dayTitle]);
    }
  };

  // Renderiza um único item da FlatList (que é o agrupamento de um dia inteiro)
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
            <View key={evento.id} style={styles.itemContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>
                        {formatTime(evento.data)} - {evento.key_evento}
                    </Text>
                    <Text style={styles.subText}>
                        {evento.descricao ?? 'Sem descrição'}
                    </Text>
                </View>
                {evento.imagemUri && (
                    <TouchableOpacity
                        onPress={() => evento.imagemUri && abrirModalImagem(evento.imagemUri)}
                    >
                        <Image source={{ uri: evento.imagemUri }} style={styles.thumbnail} />
                    </TouchableOpacity>
                )}
                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={() => iniciarEdicao(evento)} style={styles.editBtn}>
                        <Text style={styles.editText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => confirmarExclusao(evento.id)}
                        style={styles.deleteBtn}
                    >
                        <Text style={styles.deleteText}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Troca de Fraldas</Text>

      <FlatList
        data={groupedEventos} // Usando os dados agrupados
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
        }
      />

      {/* Modal de edição / adicionar imagem */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <ScrollView contentContainerStyle={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Registro</Text>

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={descricao}
              onChangeText={setDescricao}
              multiline
            />

            <View style={styles.imageButtons}>
              <TouchableOpacity onPress={tirarFoto} style={styles.imageBtn}>
                <Text style={styles.imageBtnText}>Tirar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={escolherImagem} style={styles.imageBtn}>
                <Text style={styles.imageBtnText}>Escolher da Galeria</Text>
              </TouchableOpacity>
            </View>

            {imagemUri && (
              <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
            )}

            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setEditModalVisible(false)} />
              <Button title="Salvar" onPress={confirmarEdicao} />
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* Modal para ver imagem ampliada */}
      <Modal
        visible={viewImageModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={fecharModalImagem}
      >
        <TouchableOpacity style={styles.imageModalOverlay} onPress={fecharModalImagem}>
          {viewImageUri && (
            <Image source={{ uri: viewImageUri }} style={styles.imageModalImage} />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#fff', paddingTop: 160 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#ff69b4' },
  
  // NOVOS ESTILOS para o agrupamento
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
  // FIM NOVOS ESTILOS
  
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5', // Mais claro para os itens internos
    backgroundColor: '#fff',
  },
  itemText: { fontSize: 16, fontWeight: '500' },
  subText: { fontSize: 12, color: '#666' },
  thumbnail: { width: 50, height: 50, marginHorizontal: 8, borderRadius: 4 },
  buttonsRow: { flexDirection: 'row' },
  editBtn: { marginHorizontal: 8 },
  editText: { color: '#0077cc' },
  deleteBtn: { marginHorizontal: 8 },
  deleteText: { color: '#cc0000' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16
  },
  imageBtn: {
    backgroundColor: '#8ecae6',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  imageBtnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageModalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain'
  }
});

export default CocoPage;
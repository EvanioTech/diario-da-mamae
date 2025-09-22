import React, { useState, useEffect } from 'react';
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

import {
  getEventosCoco,
  updateEventoCoco,
  addEventoCoco,
  deleteEvento
} from '../../../db/db'; // ajuste o caminho

type EventoCoco = {
  id: number;
  key_evento: string;
  data: string;
  descricao: string | null;
  imagemUri: string | null;
};

const CocoPage = () => {
  const [descricao, setDescricao] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);

  const [eventos, setEventos] = useState<EventoCoco[]>([]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingEvento, setEditingEvento] = useState<EventoCoco | null>(null);

  const [viewImageModalVisible, setViewImageModalVisible] = useState(false);
  const [viewImageUri, setViewImageUri] = useState<string | null>(null);

  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    const ev = await getEventosCoco();
    setEventos(ev);
  };

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

  // Registrar novo evento Coco (já existente com data/hora salvo em Home)
  const registrarNovaImagem = async (evento: EventoCoco) => {
    try {
      // abrir modal de edição, ou simplesmente chamar update
      await updateEventoCoco(evento.id, evento.descricao ?? '', imagemUri);
      Alert.alert('Imagem adicionada ao registro!');
      setImagemUri(null);
      carregarEventos();
    } catch (e) {
      console.error(e);
      Alert.alert('Erro ao salvar imagem.');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocôs Registrados</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>
                {item.descricao ?? 'Sem descrição'}
              </Text>
              <Text style={styles.subText}>
                {new Date(item.data).toLocaleDateString()}{" "}
                {new Date(item.data).toLocaleTimeString()}
              </Text>
            </View>
            {item.imagemUri && (
              <TouchableOpacity onPress={() => item.imagemUri && abrirModalImagem(item.imagemUri)}>
                <Image source={{ uri: item.imagemUri }} style={styles.thumbnail} />
              </TouchableOpacity>
            )}
            <View style={styles.buttonsRow}>
              <TouchableOpacity onPress={() => iniciarEdicao(item)} style={styles.editBtn}>
                <Text style={styles.editText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarExclusao(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum registro de coco encontrado.</Text>
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
            <Text style={styles.modalTitle}>Editar Cocô</Text>

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
  container: { flex: 1, padding: 20, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  itemText: { fontSize: 16, fontWeight: '500', flex: 1 },
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

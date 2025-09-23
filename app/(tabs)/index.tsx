import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { addEvento } from '../../db/db'; 

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<{ key: string }[]>([]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsModalVisible(true);

    if (option === 'Tete') {
      setModalOptions([
        { key: 'Tete' },
        { key: 'Fórmula' },
        { key: 'Papa' },
        { key: 'Mingau' },
      ]);
    } else if (option === 'Coco') {
      setModalOptions([
        { key: 'Coco' },
        { key: 'Xixi' },
        { key: 'Gases' },
        { key: 'Regurgitou' },
      ]);
    } else if (option === 'Banho') {
      setModalOptions([
        { key: 'Banho' },
        { key: 'Hidratou' },
        { key: 'Cortou as unhas' },
        { key: 'Cortou o cabelo' },
      ]);
    } else if (option === 'Remédio') {
      setModalOptions([
        { key: 'Remédio' },
        { key: 'Vitamina' },
        { key: 'Suplemento' },
        { key: 'Homeopatia' },
      ]);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda ao Diário da Mamãe!</Text>
      <Text style={styles.subtitle}>Sua jornada começa aqui.</Text>

      {/* Primeira linha */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleOptionSelect('Tete')}
          style={styles.button}
        >
          <Image
            source={require('../../assets/images/mama.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Tete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOptionSelect('Coco')}
          style={styles.button}
        >
          <Image
            source={require('../../assets/images/coco.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Coco</Text>
        </TouchableOpacity>
      </View>

      {/* Segunda linha */}
      <View style={[styles.row, { marginTop: 45 }]}>
        <TouchableOpacity
          onPress={() => handleOptionSelect('Banho')}
          style={styles.button}
        >
          <Image
            source={require('../../assets/images/banho.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Banho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleOptionSelect('Remédio')}
          style={styles.button}
        >
          <Image
            source={require('../../assets/images/frasco.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Remédio</Text>
        </TouchableOpacity>
      </View>

      {/* Modal com opções dinâmicas */}
      <Modal
        visible={ismodalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.containerModal}>
          <Text style={styles.title}>Você selecionou: {selectedOption}</Text>
          <Text style={styles.subtitle}>Escolha uma opção</Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={modalOptions}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    `Você deseja adicionar ${item.key} ao diário?`,
                    '',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Adicionar',
                        onPress: async () => {
                          try {
                            await addEvento(item.key); // Salvar no SQLite
                            Alert.alert('Evento adicionado com sucesso!');
                            setIsModalVisible(false);
                          } catch (e) {
                            Alert.alert('Erro ao adicionar evento');
                            console.error(e);
                          }
                        },
                      },
                    ]
                  )
                }
                style={styles.modalButton}
              >
                <Text style={styles.text}>{item.key}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 150,
    marginBottom: 150,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fa0fb3ff',
  },
  row: {
    flexDirection: 'row',
    marginTop: 35,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    height: 70,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fa0fb3ff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  modalButton: {
    width: 200,
    height: 60,
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fa0fb3ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#fa0fb3ff',
    borderRadius: 8,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  text: {
    color: '#fa0fb3ff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default Home;

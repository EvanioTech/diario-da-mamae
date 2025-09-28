import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { addEvento } from '../../db/db';
import { styles } from '../../helpers/home.tab.styles';

// Objeto para mapear a opção selecionada ao subtítulo desejado
const subtitleMap: { [key: string]: string } = {
  Tete: 'Escolha o tipo de alimentação',
  Coco: 'Escolha um evento de troca de fralda', // Subtítulo personalizado
  Banho: 'Escolha um evento de higiene',
  Remédio: 'Escolha o tipo de suplemento/remédio',
};

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [ismodalVisible, setIsModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<{ key: string }[]>([]);
  // Novo estado para o subtítulo dinâmico
  const [modalSubtitle, setModalSubtitle] = useState('Escolha uma opção');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    // Define o subtítulo baseado na opção, usando o objeto
    setModalSubtitle(subtitleMap[option] || 'Escolha uma opção'); 
    
    setIsModalVisible(true);

    if (option === 'Tete') {
      setModalOptions([
        { key: 'Tete' },
        { key: 'Fórmula' },
        { key: 'Mingau' },
        { key: 'Frutas' },
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
        { key: 'Remédios' },
        { key: 'Vitaminas' },
        { key: 'Suplementos' },
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
          {/* Subtítulo dinâmico */}
          <Text style={styles.subtitle}>{modalSubtitle}</Text>

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


export default Home;
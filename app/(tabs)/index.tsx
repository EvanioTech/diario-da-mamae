import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useState } from 'react';


const Home = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [ismodalVisible, setIsModalVisible] = useState(false);

  const handleOptionSelect = () => {
    
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vinda ao Diário da Mamãe!</Text>
      <Text style={styles.subtitle}>Sua jornada começa aqui.</Text>
      <View 
      style={{height:20,
       flexDirection:'row',
       marginTop:35,
       paddingHorizontal:10,
       justifyContent: 'space-between' // separa os botões
       }}>
        <View style={{flexDirection:'row', flex:1, justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => { handleOptionSelect(); setSelectedOption('tete'); }} 
          style={
            {width:"95%",
              height:70,
             padding:10,
              backgroundColor:'#fff',
                borderWidth:2,
                borderColor:'#fa0fb3ff',
               borderRadius:10,
               flexDirection:'row',
              
               alignItems:'center',
                justifyContent:'center',
               
               
              
               
               }}>
                <Image source={require('../../assets/images/mama.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Tete</Text>
          </TouchableOpacity>
        </View>
        <View style={{  flex:1,justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => { handleOptionSelect(); setSelectedOption('coco'); }} 
          style={
            {width:"95%",
             height:70,
              backgroundColor:'#fff',
               borderRadius:10,
               borderWidth:2, 
               borderColor:'#fa0fb3ff',
               padding:10,

               alignSelf:'center',
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                
                
               
               }}>
                <Image source={require('../../assets/images/coco.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Coco</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={{height:20, flexDirection:'row',marginTop:85,paddingHorizontal:10,justifyContent: 'space-between' }}>
        <View style={{flexDirection:'row', flex:1}}>
          <TouchableOpacity onPress={() => { handleOptionSelect(); setSelectedOption('banho'); }} 
          style={
            {width:"95%",
              height:70,
             padding:10,
              backgroundColor:'#fff',
               borderRadius:10,
               borderWidth:2,
               borderColor:'#fa0fb3ff',
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
               
               
              
               
               }}>
                <Image source={require('../../assets/images/banho.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Banho</Text>
          </TouchableOpacity>
        </View>
        <View style={{  flex:1 }}>
          <TouchableOpacity onPress={() => { handleOptionSelect(); setSelectedOption('remédio'); }  } 
          style={
            {width:"95%",
             height:70,
              backgroundColor:'#fff',
               borderRadius:10,
               padding:10,
               borderWidth:2,
               borderColor:'#fa0fb3ff',
               alignSelf:'center',
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                
                
               
               }}>
                <Image source={require('../../assets/images/frasco.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Remédio</Text>
          </TouchableOpacity>
        </View>
        
      </View>

      <Modal
        visible={ismodalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}>
    <View style={styles.container}>
      <Text style={styles.subtitle}>Você selecionou: {selectedOption}</Text>
      <Text style={styles.title}>Escolha uma opção</Text>
      <TouchableOpacity onPress={handleCloseModal} style={{marginTop:20, padding:10, backgroundColor:'#fa0fb3ff', borderRadius:5}}>
        <Text style={{color:'#fff', fontWeight:'bold'}}>Fechar</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default Home;
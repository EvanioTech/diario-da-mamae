import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const Home = () => {
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
        <View style={{flexDirection:'row', flex:1}}>
          <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
          style={
            {width:150,
              height:70,
             padding:20,
              backgroundColor:'#f539ccff',
               borderRadius:10,
               flexDirection:'row',
              
               alignItems:'center',
                justifyContent:'center',
               
               
              
               
               }}>
                <Image source={require('../../assets/images/mama.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Tete</Text>
          </TouchableOpacity>
        </View>
        <View style={{  flex:1 }}>
          <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
          style={
            {width:150,
             height:70,
              backgroundColor:'#f539ccff',
               borderRadius:10,
               marginLeft:25,
               alignSelf:'center',
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                
                
               
               }}>
                <Image source={require('../../assets/images/coco.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Coco</Text>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={{height:20, flexDirection:'row',marginTop:85,paddingHorizontal:10,justifyContent: 'space-between' }}>
        <View style={{flexDirection:'row', flex:1}}>
          <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
          style={
            {width:150,
              height:70,
             padding:20,
              backgroundColor:'#f539ccff',
               borderRadius:10,
              
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
               
               
              
               
               }}>
                <Image source={require('../../assets/images/banho.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Banho</Text>
          </TouchableOpacity>
        </View>
        <View style={{  flex:1 }}>
          <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
          style={
            {width:170,
             height:70,
              backgroundColor:'#f539ccff',
               borderRadius:10,
                
               
               alignSelf:'center',
               alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                
                
               
               }}>
                <Image source={require('../../assets/images/frasco.png')} style={{width:40, height:40, marginRight:10}} />
            <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Remédio</Text>
          </TouchableOpacity>
        </View>
        
      </View>
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
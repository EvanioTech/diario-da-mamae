import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Anotações</Text>
      
      
              
                <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
                style={
                  {width:"95%",
                    height:70,
                   padding:20,
                    backgroundColor:'#f539ccff',
                     borderRadius:10,
                     flexDirection:'row',
                    
                     alignItems:'center',
                      justifyContent:'center',
                      marginTop:150,
                      marginBottom:20,
                     
                     
                    
                     
                     }}>
                      <Image source={require('../../assets/images/mama.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Tete</Text>
                </TouchableOpacity>
              
              
                <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
                style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#f539ccff',
                     borderRadius:10,
                     
                     alignSelf:'center',
                     alignItems:'center',
                      justifyContent:'center',
                      flexDirection:'row',
                      marginBottom:20,
                      
                      
                     
                     }}>
                      <Image source={require('../../assets/images/coco.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Coco</Text>
                </TouchableOpacity>
              
              
            
            
              
                <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
                style={
                  {width:"95%",
                    height:70,
                   padding:20,
                    backgroundColor:'#f539ccff',
                     borderRadius:10,
                    
                     alignItems:'center',
                      justifyContent:'center',
                      flexDirection:'row',
                      marginBottom:20,
                     
                     
                    
                     
                     }}>
                      <Image source={require('../../assets/images/banho.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fff', fontWeight:'bold',fontSize:26}}>Banho</Text>
                </TouchableOpacity>
              
              
                <TouchableOpacity onPress={() => alert('Cor 1 selecionada!')} 
                style={
                  {width:"95%",
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 16,
    marginTop: 90,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default ExploreScreen;
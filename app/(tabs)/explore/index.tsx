import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Anotações</Text>
      
      
              
                <TouchableOpacity onPress={() => router.push('/(tabs)/explore/tete')} 
                style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      marginBottom:20,
                      marginTop:70,
                      
                      flexDirection:'row',
                      }}>
                        <Image source={require('../../../assets/images/mama.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Tete</Text>
                  <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
                </TouchableOpacity>
              
              
                <TouchableOpacity onPress={() => router.push('/(tabs)/explore/coco')} 
                style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      marginBottom:20,
                      
                      flexDirection:'row',
                      


                     }}><Image source={require('../../../assets/images/coco.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Coco</Text>
                  <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
                </TouchableOpacity>
              
              
            
            
              
                <TouchableOpacity onPress={() => router.push('/(tabs)/explore/banho')} 
                style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      marginBottom:20,
                      
                      flexDirection:'row',
                      
                      
                     
                     }}>
                      <Image source={require('../../../assets/images/banho.png')} style={{width:40, height:40, marginRight:10}} />
                  <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Banho</Text>
                  <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
                </TouchableOpacity>
              
              
                <TouchableOpacity onPress={() => router.push('/(tabs)/explore/remedios')} 
                style={
                  {width:"95%",
                   height:70,
                    backgroundColor:'#fff',
                     borderRadius:10,
                     borderColor:'#fa0fb3ff',
                     borderWidth:2,
                     alignSelf:'center',
                      alignItems:'center',
                      padding:10,
                      
                      flexDirection:'row',
                      
                      
                     
                     }}>
                      <Image source={require('../../../assets/images/frasco.png')} style={{width:40, height:40, marginRight:10, marginLeft:10}} />
                  <Text style={{color:'#fa0fb3ff', fontWeight:'bold',fontSize:26}}>Remédio</Text>
                  <AntDesign name="arrowright" size={28} color="black" style={{ justifyContent: 'flex-end', marginLeft: 'auto' }} />
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
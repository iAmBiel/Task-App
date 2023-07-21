import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    Alert 
  } from 'react-native';

import firebase from '../../services/firebaseConnection';

import Feather from 'react-native-vector-icons/Feather'

export default function Login({ changeStatus }) {
  const [type, setType] = useState('login'); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
      if(type === 'login'){
        //login
        const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Ops parece que deu algum erro!')
          return;
        })
      } 
      else{
        //cadastro
        const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Ops parece que algo está errado!')
          return;
        })
      }
    }

 return (
   <SafeAreaView style={styles.container}>

      <View style={styles.iconCheck}>
        <Feather name='check-circle' size={90} color='#fff'/>
        <Text style={{fontWeight: '900', color: '#fff', marginTop: 3}}>TASK APP</Text>
      </View>

      <TextInput
        placeholder='Digite seu email'
        placeholderTextColor='#747070'
        style={styles.input}
        value={email}
        onChangeText={ (text) => setEmail(text) }
      />

      <TextInput
        placeholder='************'
        placeholderTextColor='#747070'
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={ (text) => setPassword(text) }
      />

      <TouchableOpacity 
        style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#66B2EA' : '#5956CC' } ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
          {type === 'login' ? 'Logar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')}>
        <Text style={{textAlign: 'center', color: '#fff'}}>{type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>


   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:'#2E2077',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  iconCheck:{
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 45,
    padding: 10,
    color: '#000'
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10,
    borderRadius: 4
  },
  loginText: {
    color: '#fff',
    fontSize: 17
  }
})
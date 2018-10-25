import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (

    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/fox-autumn.png')} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.buttonText}>Enneagram Character Studio for Actors</Text>
      </View>

      <View style={styles.formContainer}>
      <TextInput style = {styles.input} 
                 autoCapitalize="none" 
                 onSubmitEditing={() => this.passwordInput.focus()} 
                 autoCorrect={false} 
                 keyboardType='email-address' 
                 returnKeyType="next" 
                 placeholder='Email' 
                 placeholderTextColor='rgba(225,225,225,0.7)'/>

      <TextInput style = {styles.input}   
                returnKeyType="go" 
                ref={ (input) => this.passwordInput = input} 
                placeholder='Password' 
                placeholderTextColor='rgba(225,225,225,0.7)' 
                secureTextEntry />

      <TouchableOpacity style={styles.buttonContainer} onPress={this._signInAsync}>
        <Text  style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NDA0OTMzMDh9.lWr3Q46NSFzjHxu4_6Vp-8DM_vaEUNyQHBge3J4zz3w');
    this.props.navigation.navigate('Main');
  };
}

// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2c3e50',
  },
  loginContainer:{
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  headerContainer:{
      alignItems: 'center',
      flexGrow: .2,
      justifyContent: 'center'
  },  
  logo: {
      position: 'absolute',
      width: 300,
      height: 300
  },
  input:{
      height: 40,
      backgroundColor: 'rgba(225,225,225,0.2)',
      marginBottom: 10,
      padding: 10,
      color: '#fff'
  },
  buttonContainer:{
      backgroundColor: '#2980b6',
      paddingVertical: 15
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
});
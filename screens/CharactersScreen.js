import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { WebBrowser } from 'expo';
import { createStackNavigator } from 'react-navigation';

// Require all your images here
const character_icon = require('../assets/images/character.png')

export default class CharactersScreen extends React.Component {
  
  state = {
    data: []
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    let response = await fetch('http://159.65.110.155/characters', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    // const response = await fetch("http://159.65.110.155/characters");
    const json = await response.json();
    this.setState({data: json});
  }

  static navigationOptions = {
    title: 'Characters',
  };

  openCharacterDetailScreen = (id) => {
    const { navigate } = this.props.navigation;
    navigate('CharacterDetail', { id });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.name}
              subtitle={`Type ${item.dominant_type_id}`}
              avatar={character_icon}
              onPress={() => this.openCharacterDetailScreen(item.id)}
            />
          )}
        />        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

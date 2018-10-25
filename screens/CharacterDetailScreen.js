import React from 'react';
import { AsyncStorage, View, ScrollView, StyleSheet, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { WebBrowser } from 'expo';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const character_icon = require('../assets/images/character.png')
const SECTIONS = [
  {
    slug: 'overview',
    title: 'Overview'
  },
  {
    slug: 'profile',
    title: 'Personality Profile'
  },
  {
    slug: 'exercises',
    title: 'Exercises'
  }

];


export default class CharacterDetailScreen extends React.Component {
  
  state = {
    data: [],
    dominant_type: {},
    activeSections: []
  }

_renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    switch(section.slug) {
    case "overview":
      return (
        <View style={styles.content}>
          <Text>{this.state.data.name}</Text>
        </View>
      );
      break;
    case "profile":

      return (
        <View style={styles.content}>
          <View style={styles.contentRow}>
            <View style={styles.contentName}><Text>Type: </Text></View>
            <View style={styles.contentValue}><Text>{this.state.dominant_type.slug}</Text></View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.contentName}><Text>Name: </Text></View>
            <View style={styles.contentValue}><Text>{this.state.dominant_type.name}</Text></View>
          </View> 
          <View style={styles.contentRow}>
            <View style={styles.contentName}><Text>Basic Fear: </Text></View>
            <View style={styles.contentValue}><Text>{this.state.dominant_type.basic_fear}</Text></View>
          </View> 
          <View style={styles.contentRow}>
            <View style={styles.contentName}><Text>Basic Desire: </Text></View>
            <View style={styles.contentValue}><Text>{this.state.dominant_type.basic_desire}</Text></View>
          </View> 
          <View style={styles.contentRow}>
            <View style={styles.contentName}><Text>Key Motivations: </Text></View>
            <View style={styles.contentValue}><Text>{this.state.dominant_type.key_motivations}</Text></View>
          </View> 
        </View>
      );
      break;
    case "exercises":
      return (
        <View style={styles.content}>
          <Text>This is the bridge</Text>
        </View>
      );
      break;
    }
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    const character_id = this.props.navigation.getParam('id', null);
    let response = await fetch("http://159.65.110.155/characters/" + character_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });    
    const json = await response.json();
    this.setState({data: json});
    this.fetchProfile();
  }

  fetchProfile = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    const character_id = this.props.navigation.getParam('id', null);
    let response = await fetch("http://159.65.110.155/dominant_types/" + character_id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });    
    const json = await response.json();
    this.setState({dominant_type: json});    
  }

  static navigationOptions = {
    title: 'Character Details',
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contentRow: {
    flex: 1, 
    flexDirection: 'row'
  },
  contentName: {
    width: '40%', 
    minHeight: 30,    
    marginBottom: 5
  },
  contentValue: {
    width: '60%', 
    minHeight: 30,    
    marginBottom: 10
  }
});

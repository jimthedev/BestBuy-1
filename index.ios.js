/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';

export default class BestBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeList: [],
      id: '',
      name: '',
      type: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      lat: '',
      long: '',
      hours: '',
      bbcall: 'http://localhost:3030/stores'
    };
  }

  componentDidMount() {
      this.getStoreList()
  }

  getStoreList() {
    axios.get(this.state.lastSearched)
    .then((response) => {
      var newStoreList = response.data.data.slice(0);
      this.setState({
        storeList: newStoreList
      })
    })
    .catch((error) => {
      alert(error);
      console.log(error + "Are you gonna fix that?");
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to an App!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BestBuy', () => BestBuy);

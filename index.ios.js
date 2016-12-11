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
  View,
  ListView
} from 'react-native';
import axios from 'axios';

export default class BestBuy extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1 !== r2}
    )

    this.state = {
      stores: [],
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
      bbcall: 'http://localhost:3030/stores',
    };
  }

  componentDidMount() {
      this.getStoreList()
  }

  getStoreList() {
    axios.get(this.state.bbcall)
    .then((response) => {

      this.setState({
        stores: response.data.data.slice(0);
      })
    })
    .catch((error) => {
      alert(error);
      console.log(error + "Are you gonna fix that?");
    });
  }

  getStoresDataSource() {
    return new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2
      }
    })
  }

  getStoreRows() {
    var datas = this.getStoresDataSource()
    return datas.cloneWithRows(this.state.stores)
  }

  render() {
    return (
      <View style={styles.container}>
      <ListView
          enableEmptySections={true}
          dataSource={this.getStoreRows}
          renderRow={(store) => {
            console.log('rendered a row');
              return (
                <Text>{store.name}</Text>
              )
          }
        />
        <Text>hi</Text>
      </View>
    );
  }
}

console.log(dataSource)

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

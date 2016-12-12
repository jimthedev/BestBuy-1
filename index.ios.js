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
  ListView,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default class BestBuy extends Component {
  constructor(props) {
    super(props);

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
      bbcall: 'http://localhost:3030/stores?$limit=25',
    };
  }

  componentDidMount() {
      this.getStoreList()
  }

  getStoreList() {
    axios.get(this.state.bbcall)
    .then((response) => {
      this.setState({
        stores: response.data.data.slice(0),
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
    });
  }

  getStoreRows() {
    var ds = this.getStoresDataSource()
    return ds.cloneWithRows(this.state.stores)
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome! You can find Best Buy stores at the following locations:</Text>
      <ListView
          style={styles.container}
          enableEmptySections={true}
          dataSource={this.getStoreRows()}
          renderRow={(store) => {
              return (
                <View style={styles.list}>
                <Text style={styles.listItem}>{store.name}</Text>
                <Text>{store.address}</Text>
                <Text>{store.city}, {store.state}</Text>
                <Text>{store.hours}</Text>
                </View>
              );
            }
        }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 25,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    flex: 1,
    height: 120,
  },
  listItem: {
    marginTop: 10,
    textAlign: 'left',
  }
});

AppRegistry.registerComponent('BestBuy', () => BestBuy);

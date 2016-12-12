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
  TouchableHighlight
} from 'react-native';
import {
  createRouter,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';
import axios from 'axios';

export class StoreList extends Component {
  static route = {
    navigationBar: {
      title: 'Stores',
    }
  }
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
  onStorePress(store, e) {
    console.log(store);
    this.props.navigator.push(Router.getRoute('store', {store}));
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
                    <TouchableHighlight onPress={this.onStorePress.bind(this, store)}>
                      <View>
                        <Text style={styles.listItem}>{store.name}</Text>
                        <Text>{store.address}</Text>
                        <Text>{store.city}, {store.state}</Text>
                        <Text>{store.hours}</Text>
                      </View>
                    </TouchableHighlight>
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

class Store extends Component {
  static route = {
    navigationBar: {
      title: (params) => {
        return `${params.store.name}`;
      }
    }
  }
  render() {
    const { store } = this.props.route.params;
    return (
      <View style={{marginTop:25}}>
        <Text>{store.id}</Text>
        <Text>{store.name}</Text>
        {this.props.children}
      </View>
    );
  }
}

const Router = createRouter(() => ({
  home: () => StoreList,
  store: () => Store
}));

export default class BestBuy extends Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')}></StackNavigation>
      </NavigationProvider>
    );
  }
}

AppRegistry.registerComponent('BestBuy', () => BestBuy);

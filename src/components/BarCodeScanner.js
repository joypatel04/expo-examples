'use strict';

import React, { PropTypes, Component } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { ActionCreators } from './../actions';
import Store from './../store/configureStore';
import Router from './../Router';
import Emoji from'react-native-emoji';
import { NavigationActions } from '@expo/ex-navigation';

export default class BarCodeScanner extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    _addProduct = () => {
        let navigatorUID = Store.getState().navigation.currentNavigatorUID;
        Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('addProduct', { title: 'Add Product' })))
    }

    _scanProduct = () => {
        let navigatorUID = Store.getState().navigation.currentNavigatorUID;
        Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('scanProduct', { title: 'Scan Product' })))
    }

    _allProduct = () => {
        let navigatorUID = Store.getState().navigation.currentNavigatorUID;
        Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('allProducts', { title: 'All Products' })))
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, { width: this.props.width}]} scrollEnabled={false}>
                <View style={[styles.header, {flexDirection: 'row', alignItems: 'center'}]}>
                    <Text style={[styles.headerTitle, {marginRight: 10}]}> Camera / Scanner Example </Text>
                    <TouchableOpacity onPress={() => this.props.onToggleModal()}>
                        <Ionicons name={'ios-information-circle'} size={30} color={'rgba(0, 0, 0, 0.75)'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.header, styles.rowDireaction,{ flexGrow: 1 }]}>
                    <TouchableOpacity onPress={() => this._addProduct()} style={styles.space}>
                        <Text style={{fontSize: 50}}><Emoji name=":inbox_tray:"/></Text>
                        <Text style={[styles.headerTitle]}> Add Product </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._scanProduct()} style={styles.space}>
                        <Text style={{fontSize: 50}}><Emoji name=":iphone:"/></Text>
                        <Text style={[styles.headerTitle]}> Scan Product </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._allProduct()} style={styles.space}>
                        <Text style={{fontSize: 50}}><Emoji name=":card_file_box:"/></Text>
                        <Text style={[styles.headerTitle]}> All Products </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    padding: 10
  },
  headerTitle: {
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: '700',
    color: '#455A64',
    letterSpacing: 0
  },
  space: {
    marginTop: 10,
    marginBottom: 10,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
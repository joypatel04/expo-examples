'use strict';

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ListView, Text, View, Dimensions, Image, InteractionManager } from 'react-native';
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import Store from './../../store/configureStore';
import { NavigationActions, NavigationStyles } from '@expo/ex-navigation';
import { BarCodeScanner, Permissions } from 'expo';

const window = Dimensions.get('window');

class AllProducts extends Component {

    static route = {
        styles: {
            ...NavigationStyles.SlideVertical,
            gestures: null
        },
        navigationBar: {
            title: (props) => props.title,
            renderLeft: (props) => 
                <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingTop: 5, paddingRight: 15}}
                onPress={() => 
                Store.dispatch(NavigationActions.pop(Store.getState().navigation.currentNavigatorUID)) }>
                    <Ionicons name={'ios-close'} size={35} color={'white'} />
                </TouchableOpacity>,
            visible: true
        }
    }

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            productsJSON: JSON.stringify(this.props.products),
            products: this.props.products,
            hasRecords: this.props.hasRecords,
            hasCameraPermission: '',
            dataSource: this.ds.cloneWithRows(this.formatData(this.props.products))
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    formatData(products) {
        var productsList = [];
        if (this.props.hasRecords) {
            products.forEach((product) => {
                productsList.push({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    barcode: product.barcode,
                    image: product.image
                })
            })
        }
        return productsList;
    }

    renderRow = (rowData) => {
        return (
            <View style={styles.rowData}>
                <View style={styles.ImageView}> 
                    <Image source={{uri: rowData.image}} style={{width: 150, height: 150, borderRadius: 10}} />
                </View>
                <View style={styles.contentsView}>
                    <View style={styles.contentView}>
                        <Text style={styles.productTitle}>{rowData.name}</Text>
                    </View>
                    <View style={styles.contentView}>    
                        <Text style={styles.productDesc}>{rowData.description}</Text>
                    </View>
                    <View style={styles.contentView}>    
                        <Text style={styles.productTitle}>{`$ ${rowData.price}`}</Text> 
                    </View>    
                </View>    
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.hasRecords ? 
                        <ListView 
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            enableEmptySections={true}/>
                    :
                    <View style={{justifyContent: 'center', alignItems: 'center'}} >
                        <Text style={styles.noRecords}> No Products Found  </Text>
                        <Text style={[styles.noRecords, {color: 'red'}]}> Please Add Some Products!! </Text>
                    </View>
                }
            </View>
        );
    }
}

const mapStateAllProductToProps = (state) => ({
    products: state.product.products,
    hasRecords: state.product.hasRecords 
})

const mapDispatchAllProductToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateAllProductToProps, mapDispatchAllProductToProps)(AllProducts)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  noRecords: {
    marginTop: 30,  
    color: '#455A64',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'HelveticaNeue',
  },
  rowData: {
    width: window.width - 30,
    margin: 10,
    borderColor: '#CFD8DC', 
    borderRadius: 10, 
    borderWidth: 0.5,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  ImageView: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentsView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'  
  },
  contentView: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 200  
  },
  productTitle: {  
    color: '#455A64',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue',  
  },
  productDesc: {
    color: '#455A64',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue',   
  }
});


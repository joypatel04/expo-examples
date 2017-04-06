'use strict';

import React, { Component } from 'react';
import { Alert, Animated, StyleSheet, TouchableOpacity, Text, View, Dimensions, Image, InteractionManager } from 'react-native';
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import Store from './../../store/configureStore';
import { NavigationActions, NavigationStyles } from '@expo/ex-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import ProductUtils from './../../services/productUtils'
const window = Dimensions.get('window');

class ScanProduct extends Component {

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
        this._handleBarCodeRead = this._handleBarCodeRead.bind(this)
        this.state = {
            products: this.props.products,
            hasCameraPermission: '',
            product: '',
            productFound: false,
            modalOpen: false,
            itemScanned: false
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    _handleBarCodeRead(data) {
        let { products } = this.state
        let barcode = data.data
        let product = ProductUtils.getProductDetails(products, barcode)
        if (product !== null ) {
            this.setState({
                product: product,
                productFound: true,
                itemScanned: true,
                modalOpen: true
            })
        } else {
            this.setState({
                productFound: false,
                itemScanned: true,
                modalOpen: true
            })
        }
        
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return ( 
                <View/>
            );
        } else if (hasCameraPermission === false) {
            return (
                <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center'}]}>
                    <Text> No Access to Camera </Text>
                </Animated.View>
            );
        } else {
            return (
                <View style={[StyleSheet.absoluteFill]}>
                    {
                        this.state.itemScanned ? <View style={{backgroundColor: '#fff'}}/> :
                        <Animated.View style={[StyleSheet.absoluteFill]}>
                            <BarCodeScanner
                                torchMode={'on'} 
                                style={[StyleSheet.absoluteFill]}
                                onBarCodeRead={this._handleBarCodeRead}>
                                <View style={[StyleSheet.absoluteFill]}>
                                    <View style={[{flex: 0.30, backgroundColor: 'rgba(255, 255, 255, 0.75)', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 30}]} />
                                    <View style={[{flex: 0.40, justifyContent: 'center', alignItems: 'center'}]} >
                                        <View style={[{width: window.width - 40, height: 140, borderRadius: 10, borderWidth: 1,borderColor: '#455A64'}]}></View>
                                    </View>    
                                    <View style={[{flex: 0.30, backgroundColor: 'rgba(255, 255, 255, 0.75)', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 30}]} />
                                </View>
                            </BarCodeScanner>
                        </Animated.View>
                    }
                    
                    <Modal
                        open={this.state.modalOpen}
                        offset={0}
                        overlayBackground={'rgba(0, 0, 0, 0.75)'}
                        animationDuration={200}
                        animationTension={50}
                        modalDidOpen={() => undefined}
                        modalDidClose={() => this.setState({modalOpen: false, itemScanned: false})}
                        closeOnTouchOutside={true}
                        containerStyle={{
                            justifyContent: 'center'
                        }}
                        modalStyle={{
                            borderRadius: 10,
                            margin: 20,
                            padding: 10,
                            backgroundColor: 'white',
                        }}>
                        {
                            this.state.productFound ? 
                                <View style={styles.rowData}>
                                    <View style={styles.ImageView}> 
                                        <Image source={{uri: this.state.product.image}} style={{width: 150, height: 150, borderRadius: 10}} />
                                    </View>
                                    <View style={styles.contentsView}>
                                        <View style={styles.contentView}>
                                            <Text style={styles.productTitle}>{this.state.product.name}</Text>
                                        </View>
                                        <View style={styles.contentView}>    
                                            <Text style={styles.productDesc}>{this.state.product.description}</Text>
                                        </View>
                                        <View style={styles.contentView}>    
                                            <Text style={styles.productTitle}>{`$ ${this.state.product.price}`}</Text> 
                                        </View>    
                                    </View>    
                                </View>  
                                : 
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={[styles.productTitle, {fontSize: 20}]}> No Product Found </Text>
                                </View>
                        }
                     </Modal>    
                </View>   
            );
        }
    }
}

const mapStateScanProductToProps = (state) => ({
    products: state.product.products,
    hasRecords: state.product.hasRecords 
})

const mapDispatchScanProductToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateScanProductToProps, mapDispatchScanProductToProps)(ScanProduct)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowData: {
    marginLeft: 10,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  ImageView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentsView: {
    marginTop: 10,
    margin: 10,
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


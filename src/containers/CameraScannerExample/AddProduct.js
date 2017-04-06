'use strict';

import React, { Component } from 'react';
import { StyleSheet, Alert, Keyboard, TextInput, Animated, Text, View, Dimensions, TouchableOpacity, Image, InteractionManager } from 'react-native';
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons'
import Store from './../../store/configureStore';
import { NavigationActions, NavigationStyles } from '@expo/ex-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Emoji from'react-native-emoji';
import BarCode from './../../components/BarCode/BarCode';
import { ImagePicker, Permissions } from 'expo';
import { ActionCreators } from './../../actions';

const window = Dimensions.get('window');

class AddProduct extends Component {

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

        this.state = {
            name: '',
            description: '',
            price: '',
            image: null,
            barcode: null,
            barcodeOpen: false,
            hasCameraPermission: '',
            isValid: false
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    _isValid() {
        if (this.state.name.length > 1 &&
        this.state.description.length > 1 &&
        this.state.price.length > 1 &&
        this.state.barcode !== null &&
        this.state.image !== null ) {
            return true
        } else {
            return false
        }
    }

    _onFieldBlur() {
        let result = this._isValid() 
        if (result) {
            this.setState({ isValid: true })
        }
    }

    _handleBarCodeRead = (data) => {
        this.setState({
            barcode: data.data,
            barcodeOpen: false
        });
        this._onFieldBlur()
    }

    _closeBarCodeCamera = () => {
        this.setState({
            barcodeOpen: false
        });      
    }

    _renderBarCodeScanner() {
        return (
            <BarCode 
                handleBarCodeRead={(data) => this._handleBarCodeRead(data)} 
                closeBarCodeCamera={this._closeBarCodeCamera}/>
        )
        
    }

    _captureImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3]
        })
        
        console.log(result);

        if (!result.cancelled) {
            this.setState({
                image: result.uri
            });

            this._onFieldBlur()
        }
    }

    _addProduct = () => {
        if (this.state.isValid) {
            const product = {
                id: Math.floor((Math.random() * 1000000) + 1),
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                barcode: this.state.barcode,
                image: this.state.image
            }

            Store.dispatch(ActionCreators.addProduct(product));

            this.setState({
                name: '',
                description: '',
                price: '',
                image: null,
                barcode: '',
            })

            Alert.alert("Product Successfully Added");
        } else {
            Alert.alert("Please enter all the details correctly");
        }
        
    }

    render() {
        let { image } = this.state;
        return (
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                <View style={[styles.textInputView]}>
                    <Text style={styles.headerTitle}> Name </Text>
                    <View style={{ borderRadius: 10, width: 300, borderWidth: 0.5, borderColor: '#CFD8DC',}}>
                        <TextInput
                            ref="toDoInput"
                            selectionColor="rgba(0,80,255,0.90)"
                            style={[styles.textInput]}
                            maxLength={20}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name: name})}
                            onBlur={() => this._onFieldBlur()}
                            placeholder="Product Name"
                            keyboardAppearance="dark"
                            autoCapitalize="words"
                            autoCorrect={false}
                            returnKeyType="done"
                            onSubmitEditing={() => {Keyboard.dismiss}}
                        />
                    </View>
                </View>
                <View style={[styles.textInputView]}>
                    <Text style={styles.headerTitle}> Description </Text>
                    <View style={{ borderRadius: 10, width: 300, borderWidth: 0.5, borderColor: '#CFD8DC',}}>
                        <TextInput
                            ref="toDoInput"
                            selectionColor="rgba(0,80,255,0.90)"
                            style={[styles.textInput]}
                            maxLength={50}
                            numberOfLines={5}
                            value={this.state.description}
                            onChangeText={(description) => this.setState({description: description})}
                            onBlur={() => this._onFieldBlur()}
                            placeholder="Short Description of Product"
                            keyboardAppearance="dark"
                            autoCapitalize="words"
                            autoCorrect={false}
                            returnKeyType="done"
                            onSubmitEditing={() => {Keyboard.dismiss}}
                        />
                    </View>     
                </View>
                <View style={[styles.textInputView]}>
                    <Text style={styles.headerTitle}> Price </Text>
                    <View style={{ borderRadius: 10, width: 300, borderWidth: 0.5, borderColor: '#CFD8DC',}}>
                        <TextInput
                            ref="toDoInput"
                            selectionColor="rgba(0,80,255,0.90)"
                            style={[styles.textInput]}
                            maxLength={10}
                            numberOfLines={5}
                            value={this.state.price}
                            onChangeText={(price) => this.setState({price: price})}
                            onBlur={() => this._onFieldBlur()}
                            placeholder="Eg. 0.00"
                            keyboardType="numeric"
                            keyboardAppearance="dark"
                            autoCapitalize="words"
                            autoCorrect={false}
                            returnKeyType="done"
                            onSubmitEditing={() => {Keyboard.dismiss}}
                        />
                    </View>
                </View>

                <View style={[styles.textInputView]}>
                    <Text style={styles.headerTitle}> Barcode </Text>
                    <TouchableOpacity onPress={() => this.setState({barcodeOpen: true})} style={{ borderRadius: 10, width: 300, height: 40,  justifyContent: 'center', alignItems: 'flex-start', borderWidth: 0.5, borderColor: '#CFD8DC'}}>
                        <Text style={[styles.headerTitle, {marginBottom: 0, }]}> {this.state.barcode === null ? 'Scan Barcode' : this.state.barcode} </Text>
                    </TouchableOpacity>
                </View>
                {
                    image === null ? 
                        <TouchableOpacity onPress={this._captureImage} style={[styles.imageView]}>
                            <Text style={{fontSize: 100}}><Emoji name=":camera_with_flash:"/></Text>
                        </TouchableOpacity> :
                        <Image source={{uri: image}} style={{width: 150, height: 150, marginTop: 30, borderRadius: 10}} />
                }
                
                {
                    this.state.barcodeOpen ? 
                    this._renderBarCodeScanner() :
                    null
                }
                {
                    this.state.barcodeOpen ? null :
                        <TouchableOpacity onPress={this._addProduct} style={[styles.saveButtonView, this.state.isValid ? {backgroundColor: 'rgba(0,80,255,0.90)'}: {backgroundColor: '#fff'}]}>
                            <Text style={[styles.saveButtonText, this.state.isValid ? {color: '#fff'} : {color: '#455A64'}]}> SAVE </Text>
                        </TouchableOpacity> 
                }
                
               
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateAddProductToProps = (state) => ({
    products: state.product.products 
})

const mapDispatchAddProductToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateAddProductToProps, mapDispatchAddProductToProps)(AddProduct)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    marginBottom: 10,
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: '700',
    color: '#455A64',
    letterSpacing: 0
  },
  textInputView: {
    marginTop: 20,
    width: 300,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textInput: {
    marginLeft: 10,
    height: 40,
    textAlign: 'left',
    fontSize: 16,
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
  },
  imageView: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButtonView: {
    marginTop: 30,
    width: window.width - 40,
    borderWidth: 0.5,
    borderColor: '#CFD8DC',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',  
  },
  saveButtonText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5  
  }
});
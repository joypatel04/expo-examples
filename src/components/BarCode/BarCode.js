'use strict';

import React, { Component } from 'react';
import { StyleSheet, Alert, Keyboard, TextInput, Animated, Text, View, Dimensions, TouchableOpacity, Image, InteractionManager } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarCode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCameraPermission: '',
        }
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
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
                <Animated.View style={[StyleSheet.absoluteFill]}>
                    <BarCodeScanner
                        torchMode={'on'} 
                        style={[StyleSheet.absoluteFill]}
                        onBarCodeRead={(data) => this.props.handleBarCodeRead(data)}>
                        <View style={[StyleSheet.absoluteFill]}>
                            <View style={[{flex: 0.20, backgroundColor: 'rgba(255, 255, 255, 0.75)', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 30}]}>
                                <TouchableOpacity onPress={() => this.props.closeBarCodeCamera()} style={styles.scannerButton}>
                                    <Text style={styles.scannerButtonText}> CANCLE </Text>
                                </TouchableOpacity>
                            </View> 
                            <View style={[{flex: 0.40}]} />
                            <View style={[{flex: 0.40, backgroundColor: 'rgba(255, 255, 255, 0.75)', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 30}]} />
                        </View>
                    </BarCodeScanner>
                </Animated.View>    
            );
        }
    }
}

const styles = StyleSheet.create({
  scannerButton: {
    margin: 20,
    width: 100,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderColor: '#CFD8DC', 
    borderRadius: 10, 
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'HelveticaNeue',
  }
}) 
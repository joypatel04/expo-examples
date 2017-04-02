'use strict';

import React, { PropTypes, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { ActionCreators } from './../actions';
import Store from './../store/configureStore';

export default class CouneterExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: this.props.number
        } 
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            number: nextProps.number
        })
    }

    _addNumber() {
        Store.dispatch(ActionCreators.addNumber(this.state.number + 1))
    }

    _removeNumber() {
        Store.dispatch(ActionCreators.removeNumber(this.state.number - 1))
    }

    _resetNumber() {
        Store.dispatch(ActionCreators.resetNumber(this.state.number - 1))
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, { width: this.props.width}]} scrollEnabled={false}>
                <View style={[styles.header]}>
                    <Text style={styles.headerTitle}>Redux Counter Example</Text>
                </View>
                <View style={[styles.header, {top: 10}]}>
                    <Text style={[styles.headerTitle, {fontSize : 120}]}>{this.state.number}</Text>
                </View>
                <View style={[styles.header, styles.rowDireaction]}>
                    <TouchableOpacity style={styles.space} onPress={this._addNumber.bind(this)}>
                        <FontAwesome name={'plus-circle'} size={50} color={'green'} />
                    </TouchableOpacity>
                    { this.state.number === 0 ? null :
                        <TouchableOpacity style={styles.space} onPress={this._removeNumber.bind(this)} disabled={this.state.number === 0 ? true: false}>
                            <FontAwesome name={'minus-circle'} size={50} color={'red'} />
                        </TouchableOpacity> 
                    }
                </View>   
                <TouchableOpacity style={[styles.header, {top: 50}]} onPress={this._resetNumber.bind(this)}>
                    <Text style={[styles.headerTitle, {fontSize : 20}]}>RESET</Text>
                </TouchableOpacity>         
            </ScrollView>
        );
    }
}

CouneterExample.propTypes = {
    number: PropTypes.number.isRequired
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
  rowDireaction: {
    flexDirection: 'row',
    top: 30
  },
  space: {
      marginLeft: 40,
      marginRight: 40
  }
});
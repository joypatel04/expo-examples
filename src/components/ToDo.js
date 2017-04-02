'use strict';

import React, { PropTypes, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { ActionCreators } from './../actions';
import Store from './../store/configureStore';

export default class ToDo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toDoText: '',
            toDos : this.props.toDos,
            viewWidth: 0
        } 
    }

    render() {
        return (
            <ScrollView contentContainerStyle={[styles.container, {width: this.props.width}]} scrollEnabled={false}>
                <View style={[styles.header]}>
                    <Text style={styles.headerTitle}>To-Do Example</Text>
                </View>
                <View style={[styles.textInputView]}>
                    <TextInput
                        ref="toDoInput"
                        selectionColor="rgba(0,80,255,0.90)"
                        style={[styles.textInput, {width: this.props.width - 20}]}
                        maxLength={30}
                        value={this.state.toDoText}
                        onChangeText={(toDoText) => this.setState({toDoText: toDoText})}
                        placeholder="Add To-Do"
                        keyboardAppearance="dark"
                        autoCapitalize="words"
                        autoCorrect={false}
                        returnKeyType="done"
                    />
                </View>
            </ScrollView>    
        );
    }
}

ToDo.propTypes = {
    toDos: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
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
  textInputView: {
    marginRight: 2,   
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#CFD8DC'
  },
  textInput: {
    textAlign: 'center',
    height: 40,
    fontSize: 16,
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
  }
});
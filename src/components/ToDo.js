'use strict';

import React, { PropTypes, Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ListView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ActionCreators } from './../actions';
import Store from './../store/configureStore';

export default class ToDo extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2});
        var toDosData = this._formateToDo(this.props.toDos);
        this.state = {
            toDoText: '',
            toDos : this.props.toDos,
            viewWidth: 0,
            dataSource: this.ds.cloneWithRows(toDosData)
        } 
    }

    componentWillReceiveProps(nextProps) {
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2});
        var toDosData = this._formateToDo(nextProps.toDos);
        this.setState({
            toDos: nextProps.toDos,
            dataSource: this.ds.cloneWithRows(toDosData)
        })
    }

    _formateToDo(toDos) {
        var toDosList = [];
        toDos.todos.forEach((todo) => {
            toDosList.push({
                text: todo.text,
                completed: todo.completed,
                id: todo.id
            })
        })
        return toDosList;
    }

    _addTodo() {
        Store.dispatch(ActionCreators.addToDo(this.state.toDoText, Math.random()));
        this.setState({
            toDoText: ''
        });
    }

    _toggleTodo(id) {
        Store.dispatch(ActionCreators.toggleToDo(id));
    }

    renderRow(rowData) {
        return (
            <TouchableOpacity onPress={this._toggleTodo.bind(this, rowData.id)} style={[styles.rowData, {width: this.props.width - 20}]}>
                <View style={styles.rowDataView}>
                    <Text style={styles.rowText}>{rowData.text}</Text>
                </View>
                <View style={styles.rowIconView}>    
                    <MaterialCommunityIcons name={rowData.completed ? 'checkbox-multiple-marked-circle-outline' : 'checkbox-multiple-blank-circle-outline'} size={25} color={rowData.completed ? 'green' : '#CFD8DC'} />        
                </View>
            </TouchableOpacity>
        );
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
                        onSubmitEditing={() => this._addTodo()}
                    />
                </View>
                <ListView
                    ref="todoList"
                    contentContainerStyle={[{width: this.props.width - 20, marginRight: 2,}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    initialListSize={10}
                    enableEmptySections={true}
                />
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
    borderColor: '#CFD8DC',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',
  },
  rowData: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#CFD8DC',
  },
  rowDataView: {
    flexGrow: 1,
    alignItems: 'flex-start'  
  },
  rowText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontWeight: '500',    
  },
  rowIconView: {
    marginRight: 10,
    marginTop: 5,
    alignItems: 'flex-end'
  },
});
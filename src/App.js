'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions';
import { connect } from 'react-redux';
import { NavigationProvider, NavigationContext, StackNavigation } from '@expo/ex-navigation';
import Router from './Router';
import Store from './store/configureStore'

const navigationContext = new NavigationContext({
    router: Router,
    store: Store
})

class App extends Component {
    render() {
        let initialRoute = Router.getRoute('home');

        return (
            <View style={styles.container}>
                <NavigationProvider context={navigationContext}>
                    <StackNavigation
                        id="root"
                        initialRoute={initialRoute}
                        defaultRouteConfig={{
                            navigationBar: {
                                visible: false,
                                backgroundColor: 'rgba(0,80,255,0.90)',
                                elevation: 0,
                                titleStyle: {
                                    textAlign: 'center',
                                    color: '#fff'
                                }
                            }
                        }}
                    />    
                </NavigationProvider>
                {Platform.OS === 'ios' && <StatusBar translucent={true} barStyle={'light-content'}/>}
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    number: state.counter.number
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch) 
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, InteractionManager } from 'react-native';
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux';
import Counter from './../components/Counter';
import ToDo from './../components/ToDo';

const window = Dimensions.get('window');

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewHeight: 0,
            shouldRenderSwiper: false,
            cardWidth: 0
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions( () => {
            this.setState({
                shouldRenderSwiper: true
            })
        })  
    }

    _mesureHeight(event) {
        this.setState({
            viewHeight: event.nativeEvent.layout.height + 65
        }); 
    }

    _renderSwiper() {
        if (!this.state.shouldRenderSwiper) {
            return;
        }

        return (
            <Swiper style={[styles.swiperWrapper]} height={this.state.viewHeight} loop={false} paginationStyle={{bottom: 60}} bounces={true}>
                <View onLayout={(event) => {this.setState({cardWidth: event.nativeEvent.layout.width})}} style={styles.slide1}>
                    <Counter width={this.state.cardWidth} number={this.props.number} />
                </View>
                <View style={styles.slide1}>
                    <ToDo width={this.state.cardWidth} toDos={{}} />
                </View>
                <View style={styles.slide1}>
                    <Text style={styles.text}>And simple</Text>
                </View>
            </Swiper>   
        );
    }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.navigationArea}>
                <Text style={styles.title}>Expo</Text>    
              </View>    
              <View onLayout={(event) => {this._mesureHeight(event)}} style={styles.contentArea}>
                  {this._renderSwiper()}
              </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    number: state.counter.number
})

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  navigationArea: {
    flex: 0.15,
    width: window.width,
    backgroundColor: 'rgba(0,80,255,0.90)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 10
  },
  contentArea: {
    flex: 0.85,
    width: window.width,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'HelveticaNeue',
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1
  },
  swiperWrapper: {
  },
  slide1: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  }
});
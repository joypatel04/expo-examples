'use strict';

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, InteractionManager } from 'react-native';
import Swiper from 'react-native-swiper'
import Modal from 'react-native-simple-modal';
import { connect } from 'react-redux';
import Counter from './../components/Counter';
import ToDo from './../components/ToDo';
import BarCodeScanner from './../components/BarCodeScanner';

const window = Dimensions.get('window');

class Home extends Component {

    static route = {
        navigationBar: {
            visible: false
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            viewHeight: 0,
            shouldRenderSwiper: false,
            cardWidth: 0,
            modalOpen: false
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions( () => {
            this.setState({
                shouldRenderSwiper: true
            })
        });  
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
                    <ToDo width={this.state.cardWidth} toDos={this.props.toDos} />
                </View>
                <View style={styles.slide1}>
                    <BarCodeScanner width={this.state.cardWidth} onToggleModal={() => this.setState({modalOpen: true})} />
                </View>
            </Swiper>   
        );
    }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.navigationArea}>
                <Text style={styles.title}>Examples</Text>    
              </View>    
              <View onLayout={(event) => {this._mesureHeight(event)}} style={styles.contentArea}>
                  {this._renderSwiper()}
              </View>
              <Modal
                open={this.state.modalOpen}
                offset={0}
                overlayBackground={'rgba(0, 0, 0, 0.75)'}
                animationDuration={200}
                animationTension={40}
                modalDidOpen={() => undefined}
                modalDidClose={() => this.setState({modalOpen: false})}
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
                <View style={styles.modal}>
                    <Text style={[styles.modalTitle,{color: 'red'}]}>Note: Please Add Product Data before Scan</Text>
                    <Text style={[styles.modalDescription, {marginTop: 10}]}>
                        Required Field to Add Data:
                    </Text>
                    <Text style={[styles.modalDescription, {marginTop: 10, marginLeft: 20}]}>
                     Name:  String,
                    </Text>
                    <Text style={[styles.modalDescription, {marginTop: 10, marginLeft: 20}]}>
                     Description:  String,
                    </Text>
                    <Text style={[styles.modalDescription, {marginTop: 10, marginLeft: 20}]}>
                     Price:  String,
                    </Text>
                    <Text style={[styles.modalDescription, {marginTop: 10, marginLeft: 20}]}>
                     Barcode: (Scan barcode from product)
                    </Text>
                    <Text style={[styles.modalDescription, {marginTop: 10, marginLeft: 20}]}>
                     Image: (Take Image of product Using Camera),
                    </Text>
                </View>
              </Modal>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    number: state.counter.number,
    toDos: state.toDos
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
  },
  modal: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  modalTitle: {
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontSize: 16,
    fontWeight: '400',
  },
  modalDescription: {
    color: '#455A64',
    fontFamily: 'HelveticaNeue',
    fontSize: 14,
    fontWeight: '400',
  }
});
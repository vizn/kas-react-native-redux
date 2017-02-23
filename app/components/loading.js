import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


export default class Loading extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if(this.props.show){
      return(
        <Bubbles size={10} color="#333" style={styles.loading}/>
      )
    }else{
      return(
        <View ></View>
      )
    }
  }
}
const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  loading: {
    backgroundColor: '#FFF',
    flex: 1,
    top : height/2-5,
    left: width/2-10
  }
})

import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/'
import { FormLabel, FormInput, Button } from 'react-native-elements'

const styles = StyleSheet.create({
    top:{
      height: 65
    },
    text:{
      height:40
    }
})
class Mobile extends Component {
  constructor(props){
    super(props)
    this.state={moble:''}
    this.handleClick = this.handleClick.bind(this)
  }
  check(){
    const MOBILE_REGEXP = /^1\d{10}$/;
    if (this.state.mobile == "") {
      ToastAndroid.show('手机号不能为空', ToastAndroid.SHORT)
      return false
    }
    if(!MOBILE_REGEXP.test(this.state.mobile)){
      ToastAndroid.show('手机号不合法', ToastAndroid.SHORT)
      return false
    }
    this.props.actions.login(this.state.mobile, this.state.captcha)
    return true
  }
  handleClick(){
    const {actions, captchaData} = this.props
    if(captchaData.time > 1){
      actions.statusCaptcha(this.state.mobile)
      setTimeout(this.handleClick,1000)
    }else {
      actions.statusCaptcha(this.state.mobile)
    }
  }
  render(){
    const {actions, captchaData} = this.props
    if(captchaData.status == 0){
      return(
        <View>
          <View style={styles.top}></View>
          <FormLabel>手机号</FormLabel>
          <FormInput inputStyle={styles.text} placeholderTextColor = '#CCCCCC' placeholder ='请输入手机号' onChangeText={(mobile)=>this.setState({mobile})} />
          <FormLabel>验证码</FormLabel>
          <FormInput inputStyle={styles.text} placeholderTextColor = '#CCCCCC' placeholder ='请输入验证码' onChangeText={(captcha)=>this.setState({captcha})}/>
          <TouchableOpacity onPress={this.handleClick}>
            <FormLabel>{captchaData.txt}</FormLabel>
          </TouchableOpacity>
          <Button small title='登  陆' buttonStyle={{marginTop: 20}} onPress={this.check.bind(this)}/>
        </View>
      )
    }else {
      return(
        <View>
          <View style={styles.top}></View>
          <FormLabel>手机号</FormLabel>
          <FormInput inputStyle={styles.text} placeholderTextColor = '#CCCCCC' placeholder ='请输入手机号' onChangeText={(mobile) => this.setState({mobile})}/>
          <FormLabel>验证码</FormLabel>
          <FormInput inputStyle={styles.text} placeholderTextColor = '#CCCCCC' placeholder ='请输入验证码' onChangeText={(captcha)=>this.setState({captcha})}/>
          <FormLabel>{captchaData.txt}</FormLabel>
          <Button small title='登  陆' buttonStyle={{marginTop: 20}} onPress={this.check.bind(this)}/>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    captchaData: state.captchaData.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Mobile)

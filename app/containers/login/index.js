import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/'
import * as WxapiActions from '../../redux/actions/wxApi'
import UserAgreement from './agreement'
import Mobile from './mobile'

class Login extends Component {
  constructor(props){
    super(props)
  }
  _onPressButton(){
    const { navigator} = this.props;
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                title: '用户协议',
                component: UserAgreement,

            })
        }
  }
  _onPressMobile(){
    const { navigator, login  } = this.props;
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                title: '用户登陆',
                component: Mobile,
            })
        }
  }

  render(){
    return (
      <View style={{height: Dimensions.get('window').height}}>
        <Image  style={styles.loginImage} source={require('../../assets/images/screen.jpg')}/>
        <Button onPress={this.props.wxapiActions.getWechatAccess_token}  small title='微信登陆' buttonStyle={{marginTop: 20}}/>
        <View style={styles.flexContainer}>
          <View style={styles.cellfixed}>
            <Text style={[styles.txt,{textAlign: 'left'}]}>
              登陆即同意
            </Text>
          </View>
          <View style={styles.cell}>
            <TouchableOpacity onPress={this._onPressButton.bind(this)}>
              <Text style={{textAlign: 'left', color:'#999999'}}>用户协议</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cellfixed}>
            <TouchableOpacity onPress={this._onPressMobile.bind(this)}>
              <Text style={[styles.txt,{textAlign :'right'}]}>账号登陆</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create(
  {
          loginImage: {
            height: Dimensions.get('window').height * 2/ 3,
            width: Dimensions.get('window').width,
            resizeMode: Image.resizeMode.cover,
            backgroundColor: 'rgb(96,198,187)'
          },
          flexContainer: {
              // 容器需要添加direction才能变成让子元素flex
              position : 'absolute',
              flexDirection: 'row',
              bottom: 50,
              margin: 15
          },
          cell: {
              flex: 1
          },
          txt: {
              color :'#666666',
              fontSize: 14,

          },
          cellfixed: {

          }
      }
)
    function mapStateToProps(state) {
      return {
        loginState: state.loginState.toJS()
      }
    }

    function mapDispatchToProps(dispatch) {
      return {
        actions: bindActionCreators(Actions, dispatch),
        wxapiActions: bindActionCreators(WxapiActions, dispatch),
      }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Login)

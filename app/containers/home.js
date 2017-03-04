import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  ListView,
  WebView,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
import config from '../config'
import WebViewBridge from '../components/webViewBridge'
import Loading from '../components/loading'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


const HEADER = '#3b5998';
const BGWASH = '#FFFFFF';
const DEFAULT_URL = config.defaultUrl

class Home extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getUserInfo()//获取用户资料
  }
  render() {
    return (
      <WebViewBridge {...this.props} url={DEFAULT_URL}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.loginState.toJS()
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)

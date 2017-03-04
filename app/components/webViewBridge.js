import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  WebView,
  Image,
  Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../redux/actions'
import config from '../config'
import Loading from '../components/loading'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


let HEADER = '#3b5998';
let BGWASH = '#FFFFFF';

export default class WebViewBridge extends Component {
  constructor(props) {
    super(props)
  }
  onBridgeMessage(e){
    const { navigator } = this.props
    if(navigator) {
      const message = e.nativeEvent.data
      const str = message.split('^')
      const reg=/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i //URL正则
      if(reg.test(str[0])){
        navigator.push({
          title: str[1],
          component: ()=><WebViewBridge {...this.props} url={str[0]}/>
        })
      }
      if(str[0] == 'goback'){
        navigator.pop()
      }
      if(str[0] == config.defaultUrl){
        navigator.resetTo({
          title: str[1],
          component: ()=><WebViewBridge {...this.props} url={str[0]}/>
        })
      }
    }
  }
  render() {
    const injectScript = `
      (function () {
        document.cookie = "token=`+ this.props.loginState.token +`";
      }());
    `;
    return (
      <View style={[styles.container]}>
      <WebView
          ref="webviewbridge"
          automaticallyAdjustContentInsets={true}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          injectedJavaScript={injectScript}
          onMessage={this.onBridgeMessage.bind(this)}
          style={styles.webView}
          renderError={()=>{
            return(<Image  style={styles.error} source={require('../assets/images/4041.jpg')}/>)
          }}
          renderLoading={()=>{
            return(<View style={styles.loading}><Bubbles size={10} color="#333"/></View>)
          }}
          startInLoadingState = {true}
        />
      <View style ={styles.footer} />
      </View>
    )
  }
}

const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  error: {
    // height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    resizeMode: Image.resizeMode.cover,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    top :40,
    backgroundColor: BGWASH,
  },
  loading:{
    top: height/2 - 80,
    left: width/2 - 35
  },
  webView: {
    height: height,
    width: width
  },
  footer: {
    height: 35
  }
})

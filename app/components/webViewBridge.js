import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
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
import Loading from '../components/loading'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


let HEADER = '#3b5998';
let BGWASH = '#FFFFFF';

class Home extends Component {
  constructor(props) {
    super(props)
  }
  onBridgeMessage(e){
    const { navigator } = this.props;
    const message = e.nativeEvent.data
    const str = message.split('^')
    const reg=/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i //URL正则
    if(reg.test(str[0])){
      if(navigator) {
        navigator.push({
          title: str[1],
          component: ()=><Home {...this.props} url={str[0]}/>
        })
      }
    }if(str[0] == 'goback'){
      navigator.pop()
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
          automaticallyAdjustContentInsets={false}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          injectedJavaScript={injectScript}
          onMessage={this.onBridgeMessage.bind(this)}
          style={styles.webView}
          renderLoading={()=>{
            return(<View style={styles.loading}><Bubbles size={10} color="#333"/></View>)
          }}
        />
      <View style ={styles.footer} />
      </View>
    )
  }
}

const {height,width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top :40
  },
  loading:{
    top: height/2 - 80,
    left: width/2 - 35
  },
  webView: {
    backgroundColor: BGWASH,
    height: height,
    width: width
  },
  footer: {
    height: 35
  }
})
function mapStateToProps(state) {
  return {
    captchaData: state.captchaData.toJS(),
    loginState: state.loginState.toJS(),
    status: state.status.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)

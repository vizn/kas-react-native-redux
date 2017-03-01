import React, { Component } from 'React'
import { Provider } from 'react-redux'
import configureStore from "./redux/store/configureStore"

import App from './containers/App'
import config from './config'
import Storage from 'react-native-storage';

const store = configureStore()
//初始化storage本地缓存
var storage = new Storage(config.storage)
// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用
global.storage = storage;

export default class Root extends Component {
  render(){
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

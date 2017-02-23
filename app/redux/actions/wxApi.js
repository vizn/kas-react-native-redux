import * as WechatAPI from 'react-native-wechat';
import api from './apiUri'
import config from '../../config/'
const wechat = config.wechat

import {
  LOGIN_SUCCESS
}from '../constants'

//微信注册
export function registerApp(){
  return dispatch => {
    WechatAPI.registerApp(wechat.appid)
  }
}

//微信登陆请求
export function getWechatAccess_token(){
  return async (dispatch) => {
    const isWXAppInstalled = await WechatAPI.isWXAppInstalled()
    if(!isWXAppInstalled){
      alert('请先安装微信客户端！')
      return
    }
    const res = await WechatAPI.sendAuthRequest("snsapi_userinfo", "KAS")
    let URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?'
      +'appid='+wechat.appid +'&secret='+wechat.secret +'&code='+res.code+'&grant_type=authorization_code'
    try {
      let response = await fetch(URL)
      let data = await response.json()
      if(data.openid){
        URL = 'https://api.weixin.qq.com/sns/userinfo?access_token='+data.access_token+'&openid='+data.openid
        response = await fetch(URL)
        data = await response.json()
        response = await fetch(api.wechat,{
    			method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
    		})
        const json = await response.json()
        if(json.token){
          alert('登陆成功')
            global.storage.save({
              key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
              rawData: json,
              // expires如果不指定过期时间，则会使用defaultExpires参数
            });
              dispatch({type: LOGIN_SUCCESS, token:json.token})
        }else{
          alert('网络错误')
        }
      }
      // console.log(data)
    } catch(e) {
      alert(e)
      console.log("Oops, error", e)
    }
  }
}

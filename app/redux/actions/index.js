import api from './apiUri'

import {
  REQUESTSTART,
  FAILUREMSG,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  USERINFO_SUCCESS,
  MOBILE_CAPTCHA
}from '../constants'


/*数据请求公共方法*/
//发送请求
function requestStart(){
  return {type: REQUESTSTART}
}
//接口通信失败
function failureMsg(err) {
  return {
    type: FAILUREMSG,
    errMsg: err
  }
}
//验证码发送结果
function MobileCaptcha(status, time, txt) {
	return {
		type: MOBILE_CAPTCHA,
		status: status,
    time: time,
    txt: txt,
	}
}
//验证码发送按钮状态
export function statusCaptcha(mobile){
  return (dispatch, getState) => {
    if(getState().captchaData.toJS().status == 0){
      return dispatch(MobileCaptcha(1,59, '剩余59s重新发送'))
    }
    if(getState().captchaData.toJS().status == 1){
      if(getState().captchaData.toJS().time > 1)
        return dispatch(MobileCaptcha(1, getState().captchaData.toJS().time-1, '剩余'+(getState().captchaData.toJS().time-1)+'s重新发送'))
      else {
        return dispatch(MobileCaptcha(0, 60, '重新发送验证码'))
      }
    }
  }
}
//验证是否登陆
export function islogin(){
  return (dispatch) => {
    global.storage.load({
    key: 'loginState',
    autoSync: true,
    syncInBackground: true
  }).then(ret => {
    dispatch({type: LOGIN_SUCCESS, token:ret.token})
  }).catch(err => {
    // console.warn(err.message);
    switch (err.name) {
        case 'NotFoundError':
            // TODO;
            break;
        case 'ExpiredError':
            // TODO
            break;
          }
        })
  }
}
/*Local登陆请求*/
export function login(mobile, mobileCaptcha) {
  let userInfo = {mobile:mobile,mobileCaptcha:mobileCaptcha}
	return (dispatch,getState)=>{
		return fetch(api.local,{
			method: 'POST',
      credentials: 'include',
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "mobile="+mobile+"&mobileCaptcha="+mobileCaptcha
		})
    .then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
        if(json.error_msg){
          alert(json.error_msg)
        }
				return dispatch(failureMsg(json))
			}else{
        if(json.success === false){
          alert("未知错误")
        }else{
          alert('登陆成功')
          global.storage.save({
            key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
            rawData: json,
            // expires如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
          });
            dispatch({type: LOGIN_SUCCESS, token:json.token})
        }
      }
		}).catch(e=>{
      alert('网络错误')
      console.log(e.message)
		})
	}
}
//退出登录
export function logout() {
  return dispatch => {
    global.storage.remove({
      key: 'loginState'
    })
    dispatch({type: LOGOUT_USER})
  }
}


/*获取用户信息*/
function receiveUserInfo(userInfo) {
	return {
		type: USERINFO_SUCCESS,
		userInfo: userInfo
	}
}
export function getUserInfo() {
  return async(dispatch, getState) => {
    try{
    const res = await global.storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true
    })
    if(res){
    return fetch(api.userInfo, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${res.token}`
            }
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {

				  	if(!response.ok){
				  		dispatch(failureMsg())
				  	}else{
              dispatch(receiveUserInfo(json))
            }
				  }).catch( err =>{
				  	//登录异常
				    dispatch(failureMsg(err))
				  })
        }
      }catch(e){
        dispatch(failureMsg(e))
      }
   }
}

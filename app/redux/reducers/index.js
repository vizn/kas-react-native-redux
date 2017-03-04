import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { createReducer } from 'redux-immutablejs'
import { fromJS,Map,List} from 'immutable'
import {
  NIKENAME,
  MOBILE,
  MOBILE_CAPTCHA,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOADING_STATUS,
  USERINFO_SUCCESS
} from '../constants'


//手机验证码状态数据
const captchaData = createReducer(fromJS({
  status: 0,
  time: 60,
  txt: '发送短信'
}),{
  [MOBILE_CAPTCHA]: (state, action) => {
    return state.merge({
          status: action.status,
          time: action.time,
          txt: action.txt
        })
  }
})

//登陆状态
const loginState = createReducer(fromJS({
  status: 0
}),{
  [LOGIN_SUCCESS]: (state, action) => {
    return state.merge({
      status: 1,
      token: action.token
    })
  },
  [LOGOUT_USER]: (state, action) => {
    return state.merge({
      status: 0,
      token: null
    })
  }
})

// 状态标识
const status = createReducer(fromJS({
  loading: false
}),{
  [LOADING_STATUS]: (state, action) => {
    return state.merge({
      loading: action.val
    })
  }
})
//用户基本信息
const userInfo = createReducer({
  nickname: '未登录',
  headimgurl: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  provider: '注册',
  role: '登陆',
  status: 1
},{
  [USERINFO_SUCCESS]: (state, action) => {
    return fromJS(action.userInfo)
  }
})
const rootReducer = combineReducers({
  captchaData,
  loginState,
  status,
  userInfo
})


export default rootReducer

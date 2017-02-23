'use strict';

import { AsyncStorage } from 'react-native'
import { fromJS } from 'immutable'
import devConfig from './development'
import proConfig from './production'


// 设置默认环境变量
// let env = 'production'
// process.env.RN_ENV = process.env.RN_ENV || 'development'
process.env.RN_ENV = process.env.RN_ENV || 'production'

let config = fromJS({
  env: process.env.RN_ENV,

  storage:{
    // 最大容量，默认值1000条数据循环存储
    size: 1000,
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,
    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // 可以在任何时候，直接对storage.sync进行赋值修改
    sync: require('../util/sync')
  },
  //默认首页图片.
  defaultIndexImage:"",
  //第三方登录配置
  wechat:{
    appid:'wx7e76db34de90c847',
    secret:'16e40330bdc2956c4ddb0c574f1436d5'
  },
  //开启第三方登录
  snsLogins:['wechat']
})

if(process.env.RN_ENV == "development"){
  config = config.merge(devConfig || {});
}else if(process.env.RN_ENV == "production"){
  config = config.merge(proConfig || {});
}

export default config.toJS()

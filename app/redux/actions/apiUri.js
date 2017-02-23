import config from '../../config/'

const api={
    local : config.apiRoot+'auth/local',
    wechat : config.apiRoot + 'auth/local/wechat',
    userInfo : config.apiRoot + 'users/info'
}
export default api

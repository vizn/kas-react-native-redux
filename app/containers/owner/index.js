import React, { Component } from 'react';
import { AppRegistry,
  View,
  ListView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/'
import Settings from './settings'
import WebViewBridge from '../../components/webViewBridge'

class MyPage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const list = [
      {
        title: '钱包',
        leftIcon: 'aspect-ratio',
        component: ()=><WebViewBridge {...this.props} url="http://kas.vizn.cn/account" />
      },
      {
        title: '收藏',
        leftIcon: 'favorite-border',
      },
      {
        title: '意见反馈',
        leftIcon: 'message',
      },
      {
        title: '设置',
        leftIcon: 'settings',
        component: Settings
      },
    ]
    this.state = {
      dataSource: ds.cloneWithRows(list)
    }
    this.renderRow = this.renderRow.bind(this)
  }
  //点击事件导航器加载NewView
  _onPressButton(rowData){
    const { navigator } = this.props;
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                title: rowData.title,
                component: rowData.component,
            })
        }
  }
  renderRow (rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        title={rowData.title}
        leftIcon={{name: rowData.leftIcon}}
        onPress = {this._onPressButton.bind(this, rowData)}
      />
    )
  }
  render() {
    return (
      <View style={{backgroundColor: 'rgb(236,236,236)'}}>
        <View style={{height :65}}></View>
        <List>
          <ListItem
            roundAvatar
            key= '0'
            title={this.props.userInfo.nickname||'未登陆'}
            avatar={this.props.userInfo.headimgurl||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}
            subtitle={(this.props.userInfo.provider + this.props.userInfo.role)||''}
          />
        </List>
        <List>
          <ListView
          renderRow={this.renderRow}
          dataSource={this.state.dataSource}
          />
        </List>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    userInfo: state.userInfo.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyPage)

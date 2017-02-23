import React, { Component } from 'react';
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../redux/actions/'
import { FormLabel, FormInput, Button } from 'react-native-elements'

class Settings extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const {actions, captchaData} = this.props
    return (
      <View>
        <View style={{height :65}}></View>
        <Button small title='退 出 登 陆' buttonStyle={{marginTop: 20}} onPress={actions.logout} />
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    captchaData: state.captchaData.toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings)

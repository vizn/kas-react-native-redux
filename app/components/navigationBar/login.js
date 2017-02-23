import React, { Component } from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native'
import { Tabs, Tab, Icon } from 'react-native-elements'

const {height,width} = Dimensions.get('window')

let styles = StyleSheet.create({
  navBar:{
    backgroundColor: 'rgb(96,198,187)',
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center'
  },
  navBarTitle: {
    width: (width - 144),
    alignItems: 'center',
  },
  navBarIcon: {
    color: 'white',
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500'
  },
  navBarLeftButton: {
    flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
    paddingLeft : 10
  },
  navBarRightButton: {
    flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
    paddingRight: 10
  }
})
if(Platform.OS === 'android'){
	styles = {
		...styles,
		navBar: {
			flex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			flexDirection: 'row',
			width: width,
			paddingTop: 40,
      backgroundColor: 'rgb(96,198,187)',
      // backgroundColor: '#333333'
		},
    navBarTitle: {
      width: (width - 144),
      top: 5,
      alignItems: 'center',
    },
    navBarLeftButton: {
      bottom: 5,
      paddingLeft : 6
    },
		navBarRightButton: {
      bottom: 5,
			paddingRight: 6
		}
	}
}
const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator,index) {
    if(index === 0){
      return null
    }
    return(
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style = {[styles.navBarItem, styles.navBarLeftButton]}>
        <Icon name='arrow-back' iconStyle={styles.navBarIcon}/>
      </TouchableOpacity>
    )
  },
  RightButton: function(route, navigator, index) {
    return null
  },

  Title: function(route, navigator, index) {
    return (
      <View style = {[styles.navBarItem, styles.navBarTitle]}>
        <Text style = {styles.navBarTitleText}>
          {route.title}
        </Text>
      </View>
    )
  }
}
height = Platform.OS === 'ios' ? 64 : 44;

export default(
  <Navigator.NavigationBar
  style = {[styles.navBar,{height:height}]}
  routeMapper= {NavigationBarRouteMapper} />
)

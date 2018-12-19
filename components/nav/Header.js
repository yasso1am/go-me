import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import Appstyles from '../../AppStyles'

const { height } = Dimensions.get('window')


class Header extends React.Component {

  render(){
    const color = this.props.color ? {backgroundColor: this.props.color} : {}
    const logo = this.props.color ? require('../../assets/icons/logo-gradient.png') : require('../../assets/icons/logo-white.png')
    const hamburger = this.props.color ? require('../../assets/icons/menu.png') : require('../../assets/icons/menu.png')
    const chart = this.props.color ? require('../../assets/icons/chart.png') : require('../../assets/icons/chart.png')
  return (
    <View style={[styles.header, color]}>
      <TouchableOpacity>
        <View style={{flex: 1, padding: 25, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Image source={require('../../assets/icons/chart.png')} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={logo}/>
      </View>
      <TouchableOpacity onPress={ () => { this.props.navigation.openDrawer() }}>
        <View style={{flex: 1, padding: 25, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Image source={require('../../assets/icons/menu.png')}/>
        </View>
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  header:{
    height: (height * 0.09),
    width: '100%',
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: AppStyles.primaryColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFF',
  }
})

export default connect()(Header)


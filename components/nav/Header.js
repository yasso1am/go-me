import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { logout } from '../../reducers/user'

class Header extends React.Component {
  render(){
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={ () => this.props.dispatch(logout(this.props.navigation))}>
        <View style={{flex: 1, padding: 25, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Image source={require('../../assets/icons/chart.png')} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../../assets/icons/logo-white.png')}/>
      </View>
      <TouchableOpacity>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FE7C2A',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFF',
  }
})

export default connect()(Header)


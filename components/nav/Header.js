import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Appstyles from '../../AppStyles'


class Header extends React.Component {
  render(){
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <View style={{flex: 1, padding: 25, alignItems: 'flex-start', justifyContent: 'center'}}>
          <Image source={require('../../assets/icons/chart.png')} />
        </View>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../../assets/icons/logo-white.png')}/>
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
    flex: 1,
    zIndex: 1,
    flexDirection: 'row',
    backgroundColor: AppStyles.primaryColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFF',
  }
})

export default connect()(Header)


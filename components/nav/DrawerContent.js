import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native'
import Appstyles from '../../AppStyles'
import { logout } from '../../reducers/user'

class DrawerContent extends React.Component {
  render() {

    return(
      <SafeAreaView style={{flex: 1, paddingHorizontal: 30}} forceInset={{ top: 'always', horizontal: 'never'}}>
        
        <View style={styles.nameContainer}>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={ () => this.props.navigation.closeDrawer()}>
              <Image resizeMode='contain' style={[styles.icon, {padding: 15}]} source={require('../../assets/icons/x-icon-dark.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 13, color: '#D3D3D3', marginVertical: 10}}> Good Afternoon,</Text>
            <Text adjustsFontSizeToFit 
                  numberOfLines={1}
                  style={{fontSize: 30, fontWeight: 'bold', color: AppStyles.primaryColor, marginBottom: 15}}
            > 
              {this.props.user.name} 
            </Text>
          </View>

        </View>

        <View style={styles.linksContainer}>
          
          <View style={styles.linkContainer}>
            <TouchableOpacity style={styles.linkButton} onPress={ () => this.props.navigation.navigate('ProfileSettings')}>
              <Image resizeMode='contain' style={styles.icon} source={require('../../assets/icons/profile-settings-icon.png')} />
              <Text style={styles.linkText}> Profile Settings </Text>
            </TouchableOpacity>
          </View>
        
        {/*           
          <View style={[styles.linkContainer, {borderTopWidth: 0}]}>
            <TouchableOpacity style={styles.linkButton} onPress={ () => this.props.navigation.navigate('WorkoutHistory') }>
              <Image resizeMode='contain' style={styles.icon} source={require('../../assets/icons/rocket-icon.png')} />
              <Text style={styles.linkText}> Workout History </Text>
            </TouchableOpacity>
          </View> */}
          
          {/* <View style={[styles.linkContainer, {borderTopWidth: 0}]}>
            <TouchableOpacity style={styles.linkButton} onPress={ () => this.props.navigation.navigate('ApplicationSettings')}>
              <Image resizeMode='contain' style={styles.icon} source={require('../../assets/icons/settings-icon.png')} />
              <Text style={styles.linkText}> Application Settings </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.linkContainer, {borderTopWidth: 0}]}>
            <TouchableOpacity style={styles.linkButton} onPress={ () => this.props.navigation.navigate('GoalSelect')}>
              <Image resizeMode='contain' style={styles.icon} source={require('../../assets/icons/star-icon.png')} />
              <Text style={styles.linkText}> GoMe Goal Tracker </Text>
            </TouchableOpacity>
          </View> */}

        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.linkButton} onPress={ () => this.props.dispatch(logout(this.props.navigation))}>
            <Image resizeMode='contain' style={[styles.icon, {opacity: 1, height: '40%'}]} source={require('../../assets/icons/power-icon.png')} />
            <Text style={{color: AppStyles.primaryColor}}>Logout</Text> 
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flex: 2,
  },
  linksContainer: {
    flex: 6,
    alignItems: 'center',
  },
  logoutContainer: {
    flex: 1
  },
  linkContainer: {
    height: '20%',
    width: '100%',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText: {
    fontSize: 13,
    opacity: 0.75,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '70%',
  },
  icon: {
    opacity: 0.5,
    height: '80%', 
    width: '15%', 
    marginRight: 15,
  }
})

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(DrawerContent)
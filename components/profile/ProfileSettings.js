import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import AppStyles from '../../AppStyles'
import { NavigationActions } from 'react-navigation'


class ProfileSettings extends React.Component{
  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: {color: AppStyles.primaryColor},
    headerTintColor: AppStyles.primaryColor,
  })

  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text onPress={ () => this.props.navigation.dispatch(NavigationActions.back())}> Profile Settings </Text>
      </View>
    )
  }
}

export default ProfileSettings
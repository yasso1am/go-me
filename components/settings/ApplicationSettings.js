import React from 'react'
import { 
  View,
  Text
} from 'react-native'
import AppStyles from '../../AppStyles'

class ApplicationSettings extends React.Component{

  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: {color: AppStyles.primaryColor},
    headerTintColor: AppStyles.primaryColor,
  })

  
  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Application Settings </Text>
      </View>
    )
  }
}

export default ApplicationSettings
import React from 'react'
import { 
  View,
  Text,
} from 'react-native'
import AppStyles from '../../AppStyles'

class WorkoutHistory extends React.Component{
  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: AppStyles.primaryColor,
    headerTintColor: AppStyles.primaryColor,
  })
  
  render(){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Workout History </Text> 
      </View>
    )
  }
}

export default WorkoutHistory
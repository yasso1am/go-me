import React from 'react'
import { 
  View,
  Text,
} from 'react-native'

class WorkoutHistory extends React.Component{
  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: {color: '#FE7C2A'},
    headerTintColor: '#FE7C2A',
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
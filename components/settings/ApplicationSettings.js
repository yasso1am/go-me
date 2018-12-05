import React from 'react'
import { 
  View,
  Text
} from 'react-native'

class ApplicationSettings extends React.Component{

  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: {color: '#FE7C2A'},
    headerTintColor: '#FE7C2A',
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
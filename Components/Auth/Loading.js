import React from 'react'
import { Image, View } from 'react-native'

export default class Loading extends React.Component {
  render(){
    return(
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1, width: '100%', height: '100%'}}
          resizeMode='cover' 
          source={ require('../../assets/images/splash-screen-large.png')}
        />
      </View>
    )
  }
}
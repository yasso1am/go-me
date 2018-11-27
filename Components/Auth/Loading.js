import React from 'react'
import { Image, View } from 'react-native'

export default class Loading extends React.Component {
  render(){
    return(
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1}}
          resizeMode='contain' 
          source={ require('../../assets/icons/logo-white.png')}
        />
      </View>
    )
  }
}
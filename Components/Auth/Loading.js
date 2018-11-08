import React from 'react'
import {
  Image
} from 'react-native'
import { LinearGradient } from 'expo'

export default class Loading extends React.Component {
  render(){
    return(
      <LinearGradient
        colors={['#FE7C2A', '#F1552D']}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      >
        <Image 
          source={ require('../../assets/images/white-logo.png')}
        />
      </LinearGradient>
    )
  }
}
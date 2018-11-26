import React from 'react'
import {
  Image
} from 'react-native'
import { LinearGradient } from 'expo'

export default class Loading extends React.Component {
  render(){
    if (this.props.remebered === null){
      return(
        <LinearGradient
          colors={['#FE7C2A', '#F1552D']}
          style={{flex: 1, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
        >
          <Image 
            source={ require('../../assets/icons/logo-white.png')}
          />
        </LinearGradient>
      )
    } return null
  }
}
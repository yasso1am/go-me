import React from 'react'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import { validateToken } from '../../reducers/auth'

class CheckUser extends React.Component{
  async componentDidMount() {
    const { user, navigation } = this.props
    validToken = await validateToken()
    if (user && validToken === true){
      console.log('token validation complete')
      this.props.navigation.navigate('App')
    } else {
        this.props.navigation.navigate('Auth')
    }
  }

  render(){
    return(
      <View style={{flex: 1}}>
        <Image
          style={{flex: 1, width: '100%', height: '100%'}}
          resizeMode='contain' 
          source={ require('../../assets/images/splash-screen-large.png')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CheckUser)
import React from 'react'
import {
  View, 
  Text,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../reducers/user'


class Profile extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Pushing on Home"
          onPress={() => this.props.navigation.push('Home')}
        />
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.dispatch(logout())
            this.props.navigation.navigate('AuthHome')
            }}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default connect()(Profile)
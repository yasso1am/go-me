import React from 'react';
import axios from 'axios'
import { 
  View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient, Facebook } from 'expo'
import { connect } from 'react-redux'

import { login } from '../../reducers/user'

class AuthHome extends React.Component {
  state = { buttonStyle: null }

  static navigationOptions = {
    header: null,
    title: 'Account Selection',
  }

  measureHeight = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout
    const buttonStyle = {
      borderRadius: 5, 
      borderWidth: 0.5, 
      width: '100%',
      height: height / 6.9, 
      borderColor: '#FE7C2A', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginVertical: 5,
    }
    this.setState({buttonStyle})
  }

  loginFacebook = async() => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('342397049861613', {
        permissions: ['public_profile', 'email'],
        behavior: 'web',
      })
      console.log({token, expires, permissions, declinedPermissions})
      if (type === 'success') {
        axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,email,picture.type(large)`)
        .then( res => {
          const { picture, name, birthday, id, email } = res.data
          console.log({picture, name, birthday, id, email})
          Alert.alert(`Welcome to GoMe ${name}`)
          this.props.navigation.navigate('Profile')
          console.log({res})
        })
        .catch( err => {
          console.log('err')
          Alert.alert('Failure to retrieve data')
        }) 
      } else {
        Alert.alert('User must have cancelled')
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }
  
  render() {
    const { buttonStyle } = this.state
    const { navigation } = this.props
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <ImageBackground
              source={require('../../assets/images/login-header.png')}
              style={{ flex: 3, width: '100%', height: '100%'}}
            >
              <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                  source={require('../../assets/images/white-logo.png')}
                />
              </View>
              <View style={{flex: 1, paddingHorizontal: 30, justifyContent: 'flex-end', paddingBottom: 30, alignItems: 'flex-start'}}>
                <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', paddingBottom: 10}}> Welcome to GoMe </Text>
                <Text style={{fontSize: 13, color: 'white'}}> The goal oriented fitness app.</Text>
              </View>
            </ImageBackground>


          <View onLayout={ (event) => this.measureHeight(event)} style={styles.lowerContainer}>
            
            { buttonStyle !== null &&
              <View style={{flex: 1, width: '100%'}}>
                <TouchableOpacity style={[buttonStyle, {borderColor: '#707070', marginTop: 0}]}>
                  <Text> Continue with your <Text style={{color: '#dd4b39'}}>Google</Text> account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.loginFacebook} style={[buttonStyle, {borderColor: '#707070'}]}>
                  <Text> Continue with your <Text style={{color: '#3B5998'}}>Facebook</Text> account</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection: 'row', height: buttonStyle.height, alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.line} />
                    <Text style={{ fontSize: 11, color: '#242134'}}> OR </Text>
                  <View style={styles.line} />
                </View>

                <TouchableOpacity 
                  style={[buttonStyle, {backgroundColor: '#FE7C2A'}]}
                  onPress={() => navigation.navigate('Register', {inputHeight: buttonStyle.height})}
                >
                  <Text style={{color: 'white'}}> Continue with your email</Text>
                </TouchableOpacity>
                
                <View style={{alignItems: 'center', justifyContent: 'center', height: buttonStyle.height, flexDirection: 'row'}}>
                  <Text> Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login', {inputHeight: buttonStyle.height})}>
                    <Text style={{color: '#F1552D'}}> Log In Now </Text>
                  </TouchableOpacity>       
                </View>
              </View> 
            }

          </View>
        </View>
    );
  }
}

export default connect()(AuthHome)

const styles = StyleSheet.create({
  lowerContainer: {
    flex: 2, 
    width: '100%', 
    paddingTop: 15, 
    paddingHorizontal: 30, 
    backgroundColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  line: {
    width: '44%', 
    height: 1, 
    borderWidth: 0.5, 
    borderColor: '#707070'
  }
})
import React from 'react';
import { 
  SafeAreaView,
  Button, 
  View, 
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'

import { login } from '../../reducers/user'

class Login extends React.Component {

  static navigationOptions = {
    header: null
  }

  state = { 
    active: 'Login', 
    name: '',
    email: '', 
    password: '',
    passwordConfirm: '',
  }

  handleSubmit = () => {
    const { email, password } = this.state
    this.props.dispatch(login(email, password))
    console.log('Submitted')
  }
  
  render() {
    const { active } = this.state
    const { navigation } = this.props
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            
            <Button
              title='Login'
              onPress={() => this.setState({active: 'Login'})}
            />
            <Button
              title='Register'
              onPress={() => this.setState({active: 'Register'})}
            />

          </View>

          { active === 'Register' &&
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor="#6F6F6F"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType='next' 
              onSubmitEditing={ () => { this.email.focus() }}
              onChangeText={ (name) => this.setState({ name }) }
              underlineColorAndroid="transparent"
            />
          }

          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#6F6F6F"
            ref={ (input) => { this.email = input }}
            autofocus
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType='next' 
            onSubmitEditing={ () => { this.password.focus() }}
            onChangeText={ (email) => this.setState({ email }) }
            underlineColorAndroid="transparent"
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#6F6F6F"
            ref={(input) => { this.password = input }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType={ 'done' }
            onSubmitEditing={ active === 'Register' ? () => this.passwordConfirm.focus() : this.handleSubmit }
            onChangeText={ (password) => this.setState({ password }) }
            underlineColorAndroid="transparent"
          />

          { active === 'Register' &&
            <TextInput
              style={styles.textInput}
              placeholder="Password Confirmation"
              placeholderTextColor="#6F6F6F"
              ref={ (input) => { this.passwordConfirm = input }}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType='go'
              onSubmitEditing={ this.handleSubmit }
              onChangeText={ (passwordConfirm) => this.setState({ passwordConfirm }) }
              underlineColorAndroid="transparent"
            />
          }

          { active === 'Login' &&
            <Text style={{marginBottom: 30}}> Don't have an account?
              <Text 
                style={{color: 'blue'}} 
                onPress={ () => this.setState({active: 'Register'})}> Sign up Here!</Text>
            </Text>
          }

          
          <Button
            title="Go"
            onPress={this.handleSubmit}
          />

        </View>
    );
  }
}

export default connect()(Login)

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 20,
      height: '100%',
      backgroundColor: 'white',
  },
  loginButton:{
      backgroundColor:'#6151B5',
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',               
  },
  buttonText:{
      color: 'white',
      fontSize: 16,
  },
  textInput: {
      ...Platform.select({
           ios: { fontFamily: 'Arial', }, 
           android: { fontFamily: 'Roboto' }
      }),
      width: '80%',
      fontSize:14,
      color:'#6F6F6F',
      height:50,
      borderColor: 'lightgrey',
      borderWidth: 2,
      marginBottom:20,
      padding:15
  }
})
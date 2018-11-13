import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'

import { login, register } from '../../reducers/user'

class LoginAndRegister extends React.Component{
  
  state = { 
    name: '',
    email: '', 
    password: '',
    passwordConfirm: '',
  }

  static navigationOptions = ({ navigation}) => 
    ({
      headerBackTitle: navigation.state.routeName,
    })

  styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#F8F8F8', 
      padding: 30, 
      alignItems: 'center', 
    },
    textInput: {
      width: '100%',
      color:'#6F6F6F',
      borderRadius: 5,
      marginVertical: 7.5,
      paddingLeft: 15,
      height: this.props.navigation.state.params.inputHeight,
      borderColor: '#707070',
      borderWidth: 1,
    },
    button: {
      borderRadius: 5, 
      borderWidth: 1, 
      width: '100%',
      marginTop: 15,
      height: this.props.navigation.state.params.inputHeight, 
      borderColor: '#FE7C2A', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  })

  handleSubmit = () => {
    const { name, email, password, passwordConfirm } = this.state
    const { dispatch, navigation } = this.props
    const active = this.props.navigation.state.routeName
    if (active === 'Register'){
      if (!passwordConfirm || !password || !email || !name){
        Alert.alert("Please complete all fields")
        return
      } 
      if ((passwordConfirm && password) && passwordConfirm !== password) {
        Alert.alert("Passwords must match")
        return
      } else {
        dispatch(register(name, email, password, passwordConfirm, navigation))
        this.setState({ email: '', password: '', passwordConfirm: '', name: ''})
        return
      }
    } else if (active === 'Login' && (email && password !== '')){
        dispatch(login(email, password, navigation))
        this.setState({ email: '', password: ''})
      } else {
        Alert.alert("Please complete both fields")
      }
    }

  render(){
    const active  = this.props.navigation.state.routeName
    return(
      <KeyboardAvoidingView
      style={this.styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 10}}> { active === 'Register' ? 'Create an account' : 'Login' } </Text>
        </View>
       
          { active === 'Register' &&
            <TextInput
              style={[this.styles.textInput, {marginTop: 15}]}
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
            style={this.styles.textInput}
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
            style={this.styles.textInput}
            placeholder="Password"
            placeholderTextColor="#6F6F6F"
            ref={(input) => { this.password = input }}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType={ active === 'Register' ? 'next' : 'done' }
            onSubmitEditing={ active === 'Register' ? () => this.passwordConfirm.focus() : this.handleSubmit }
            onChangeText={ (password) => this.setState({ password }) }
            underlineColorAndroid="transparent"
          />

          { active === 'Register' &&
            <TextInput
              style={this.styles.textInput}
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
            <View style={{
              alignItems: 'center',
              justifyContent: 'flex-end', 
              flexDirection: 'row', 
              height: this.props.navigation.state.params.inputHeight,
              width: '100%',
            }}>
              <Text> Forgot password? </Text>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('ForgotPassword', {inputHeight: this.props.navigation.state.params.inputHeight})}}
              >
                <Text style={{color: '#FE7C2A'}}> Click Here </Text>
              </TouchableOpacity>              
            </View>
          
          }

          <TouchableOpacity 
            style={[this.styles.button, {backgroundColor: '#FE7C2A'}]}
            onPress={this.handleSubmit}
          >
            <Text style={{color: 'white'}}> { active === 'Login' ? 'Login' : 'Create an Account' } </Text>
          </TouchableOpacity>
        
        </KeyboardAvoidingView>
    )
  }
}


export default connect()(LoginAndRegister)
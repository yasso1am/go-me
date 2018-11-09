import React from 'react'
import { 
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'

class ForgotPassword extends React.Component {
  state = { email: '' }

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
      borderColor: '#707070', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  })

  render() {
    return(
      <View style={this.styles.container}>

        <View style={{alignSelf: 'flex-start'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20 }}>Forgot Password</Text>
          <Text style={{color: '#707070', paddingVertical: 10}}>Enter your email down below, and we will send you a link to reset your password</Text>
        </View>


        <TextInput
          style={this.styles.textInput}
          placeholder="Email"
          placeholderTextColor="#6F6F6F"
          autofocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType='send' 
          onSubmitEditing={() => f => f}
          onChangeText={ (email) => this.setState({ email }) }
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity 
            style={[this.styles.button, {backgroundColor: '#FE7C2A'}]}
            onPress={ () => f => f }
          >
            <Text style={{color: 'white'}}> Recover Password </Text>
        </TouchableOpacity>

        


      </View>
    )
  }
}


export default ForgotPassword
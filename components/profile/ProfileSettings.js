import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker, Permissions, ImageManipulator } from 'expo'
import AppStyles from '../../AppStyles'

import { updateProfile } from '../../reducers/user'

class ProfileSettings extends React.Component{
  static  navigationOptions = ({navigation}) => ({
    headerBackTitleStyle: {color: AppStyles.primaryColor},
    headerTintColor: AppStyles.primaryColor,
  })

  state = {
    avatar: null,
    profileImage: null,
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  componentDidMount(){
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      avatar: this.props.user.avatar
    })
  }

  requestPhotoAccess = async () => {
    const { navigation } = this.props
    const errorMessage = Platform.OS === 'ios' ?
    'To use this feature, you must give GoMe photo access. Go to Settings > GoMe > Photos and choose Read and Write'
    :
    'To use this feature, you must give GoMe photo access. Go to Settings > Apps & Notifications > App Permissions > Storage and select GoMe'
    let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted'){
        this.setState({hasCameraPermission: status })
        this.pickImage()
      } else {
        Alert.alert(
          'Permissions Required',
          errorMessage,
          [
            {text: 'OK'}
          ]
        )
      }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      quality: 0.5,
      aspect: [4, 4],
      base64: true,
    })
    
    if (!result.cancelled){
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.uri,
        [ {resize: {width: 500}} ],
        { format: 'jpeg', compress: 0.5, base64:true},
      ).then( res => {
        debugger
          this.setState({profileImage: res})
      }).catch ( err => {
          Alert.alert('Failed to resize image')
      })
    }
  }

  submitProfile = () => {
    const { profileImage, name, email, password, passwordConfirm } = this.state
    let profile = {
      name: name,
      email: email,
      avatar: profileImage
    }
    if (password & passwordConfirm){
      if (password !== passwordConfirm){
        Alert.alert('Passwords must match')
        return
      } else {
        profile = {
          ...profile,
          password: password,
          password_confirmation: passwordConfirm
        }
      }
    }
    this.props.dispatch(updateProfile(profile))
  }

  render(){
    const { profileImage, avatar } = this.state
    const image = profileImage !== null ? {uri: profileImage.uri} : avatar ? {uri: avatar} : require('../../assets/icons/default-avatar.png')

    return(
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} style={{flex: 1}}>              
          
          <View style={styles.titleContainer}> 
            <Text style={{fontSize: 15, color: '#D1D1D1'}}> Profile Settings </Text>
          </View>

          <View style={styles.imageContainer}>
            <ImageBackground
              style={{width: 120, height: 120}}
              imageStyle={{ borderRadius: 60}}
              source={image}
            >
              <TouchableOpacity 
                onPress={this.requestPhotoAccess}
                style={{alignItems: 'center', top: '85%'}}
                activeOpacity={0.5}
              > 
                <Image 
                  style={{width: 30, height: 30 }} source={require('../../assets/icons/camera-circle.png')} 
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View style={styles.bodyContainer}>
            <TextInput 
              placeholder={this.props.user.name}
              placeholderTextColor="#6F6F6F"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.name}
              textContentType={"name"}
              returnKeyType='next' 
              onSubmitEditing={ () => { this.email.focus() }}
              onChangeText={ (name) => this.setState({ name }) }
              underlineColorAndroid="transparent"
              style={styles.textInput}
            />

            <TextInput 
              style={styles.textInput}
              placeholder={this.props.user.email}
              placeholderTextColor="#6F6F6F"
              ref={ (input) => { this.email = input }}
              autofocus
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType='next'
              textContentType={"none"}
              value={this.state.email}
              onSubmitEditing={ () => { this.password.focus() }}
              onChangeText={ (email) => this.setState({ email }) }
              underlineColorAndroid="transparent"
            />

            <TextInput 
              style={styles.textInput}
              placeholder="Change Password"
              placeholderTextColor="#6F6F6F"
              ref={(input) => { this.password = input }}
              autoCapitalize="none"
              value={this.state.password}
              autoCorrect={false}
              textContentType={"none"}
              secureTextEntry={true}
              returnKeyType={ 'next' }
              onSubmitEditing={ () => { this.passwordConfirm.focus() }}
              onChangeText={ (password) => this.setState({ password }) }
              underlineColorAndroid="transparent"
            />

             <TextInput 
              style={styles.textInput}
              placeholder="Password Confirmation"
              placeholderTextColor="#6F6F6F"
              ref={(input) => { this.password = input }}
              autoCapitalize="none"
              value={this.state.password}
              autoCorrect={false}
              textContentType={"none"}
              secureTextEntry={true}
              returnKeyType={'done'}
              onChangeText={ (passwordConfirm) => this.setState({ passwordConfirm }) }
              underlineColorAndroid="transparent"
            />

        
            <TouchableOpacity onPress={this.submitProfile} style={[styles.textInput, styles.button]}>
              <Text style={{color: '#fff', fontSize: 13}}> Update Settings </Text>
            </TouchableOpacity>
          </View>
          

        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  titleContainer:{
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D1D1D1'
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyContainer: {
    flex: 7,
    paddingHorizontal: 30
  },
  textInput: {
    width: '100%',
    color:'#6F6F6F',
    borderRadius: 5,
    marginVertical: 7.5,
    paddingLeft: 15,
    height: 50,
    borderColor: '#707070',
    borderWidth: 0.5,
  },
  button: {
    backgroundColor: AppStyles.primaryColor,
    borderColor: AppStyles.primaryColor,
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    color: 'white',
  }
})

const mapStateToProps = state => {
  return { user: state.user }
}


export default connect(mapStateToProps)(ProfileSettings)
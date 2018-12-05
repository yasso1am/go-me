import React from 'react'
import { connect } from 'react-redux'
import {
  View, 
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Text,
  Platform,
  StatusBar,
} from 'react-native'
import QuickPicker from 'quick-picker'
import { ImagePicker, Permissions, ImageManipulator } from 'expo'
import { Slider } from 'react-native-elements'

import { updateProfile } from '../../reducers/user'

import { heightArray } from './SliderData'


const goals = [
  'I want to lose weight',
  'I want to get in better shape',
  'I want to be able to run longer',
  'I want to be healthier',
  'I want to get my steps in',
]

class BuildProfile extends React.Component {
  state = {
    height: 66,
    weight: 150,
    activity: 3,
    activeEdit: '',
    hasBeenEdited: [],
    profileImage: null,
    hasCameraPermission: null,
    goal: 'I want to lose weight',
  }
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  componentDidMount(){
    const { user } = this.props
    let editedArray = this.state.hasBeenEdited
    if ( user.height ){
      editedArray.push('height')
      this.setState({height: user.height, hasBeenEdited: editedArray})
    } if (user.weight){
      editedArray.push('weight')
      this.setState({weight: user.weight, hasBeenEdited: editedArray})
    } if ( user.activity) {
      editedArray.push('activity')
      this.setState({activty: user.activity, hasBeenEdited: editedArray})
    } if ( user.goal) {
      editedArray.push('goal')
      this.setState({goal: user.goal, hasBeenEdited: editedArray})
    }
  }

  editActive = (subject) => {
    let updated = this.state.hasBeenEdited
    updated.push(subject)
      this.setState({ 
        activeEdit: subject, 
        hasBeenEdited: updated 
      })
  }

  activityText = () => {
    const {activity } = this.state
    switch ( activity) {
      case 1:
        return "Sedentary"
      case 2:
        return "Lightly active"
      case 3: 
        return "Moderately active"
      case 4:
        return "Active"
      case 5:
        return "Very active"
    }
  }

  goToProfile = () => {
    const { height, weight, activity, profileImage, goal, hasBeenEdited } = this.state
    if ( hasBeenEdited.length <= 3){
      Alert.alert('Please answer all of the questions')
    } else {
      const photo = profileImage !== null ? profileImage.base64 : null
      const profile = {
        height,
        weight,
        activity,
        goal,
        avatar: photo
      }
      this.props.dispatch(updateProfile(profile))
      this.props.navigation.navigate('Profile')
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
          this.setState({profileImage: res})
      }).catch ( err => {
          Alert.alert('Failed to resize image')
      })
    }
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


  goalPicker = () => {
    const { goal } = this.state
    this.editActive('goal')
      QuickPicker.open({
        items: goals,
        selectedValue: this.state.goal,
        onValueChange: (goal) => this.setState({ goal}),
        doneButtonTextStyle: { color: '#FE7C2A'},
        onTapOut: QuickPicker.close()

      })
  }

  render() {
    const { activeEdit, hasBeenEdited, profileImage } = this.state
    const image = profileImage !== null ? {uri: profileImage.uri} : this.props.user.avatar ? {uri: this.props.user.avatar} : require('../../assets/icons/default-avatar.png')

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
       <StatusBar
        barStyle="dark-content"
        backgroundColor="#ecf0f1"
      />
        <View style={styles.header}>
          <Image source={require('../../assets/icons/logo-gradient.png')}/>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                <ImageBackground
                  style={{width: 100, height: 100}}
                  imageStyle={{ borderRadius: 50}}
                  source={image}
                >
                  <TouchableOpacity 
                    onPress={this.requestPhotoAccess}
                    style={{alignItems: 'center', top: '80%'}}
                    activeOpacity={0.5}
                  > 
                    <Image 
                      style={{width: 30, height: 30 }} source={require('../../assets/icons/camera-circle.png')} 
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
                <Text adjustsFontSizeToFit> Good Afternoon, </Text>
                <Text 
                  adjustsFontSizeToFit 
                  numberOfLines={1}
                  style={{fontSize: 40, fontWeight: 'bold'}}>
                    {this.props.user.name}
                </Text>
                <Text adjustsFontSizeToFit style={{textAlign: 'center', paddingHorizontal: '10%'}}> Before you get started we need to know a couple of things </Text>
              </View>
          </View>
          
          <View style={styles.questionsContainer}>

            <TouchableOpacity onPress={ () => this.editActive('height')} style={[styles.buttonStyles, activeEdit === 'height' && styles.buttonActive]} >
              { hasBeenEdited.includes('height') ?
                <View style={styles.sliderView}>
                  <Text adjustsFontSizeToFit style={styles.answerText}> <Text style={[styles.answerText, {fontWeight: 'bold'}]}>Height:</Text> { heightArray[this.state.height]} </Text>
                  <Slider
                    value={this.state.height}
                    step={1}
                    thumbTouchSize={{width: 60, height: 60}}
                    minimumValue={46}
                    maximumValue={90}
                    trackStyle={styles.sliderTrack}
                    thumbStyle={styles.sliderThumb}
                    onValueChange={(value) => this.setState({height: value})}
                  />
                </View>
              :
                <Text> How tall are you?</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.editActive('weight')} style={[styles.buttonStyles, activeEdit === 'weight' && styles.buttonActive]}>
              { hasBeenEdited.includes('weight') ?
                  <View style={styles.sliderView}>
                    <Text adjustsFontSizeToFit style={styles.answerText}> <Text style={[styles.answerText, {fontWeight: 'bold'}]}>Weight:</Text> { this.state.weight } Lbs </Text>
                    <Slider
                      value={this.state.weight}
                      thumbTouchSize={{width: 60, height: 60}}
                      step={1}
                      minimumValue={50}
                      maximumValue={300}
                      trackStyle={styles.sliderTrack}
                      thumbStyle={styles.sliderThumb}
                      onValueChange={(value) => this.setState({weight: value})}
                    />
                  </View>
                :
                  <Text> What is your current weight? (lbs) </Text>
                }           
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.editActive('activity')} style={[styles.buttonStyles, activeEdit === 'activity' && styles.buttonActive]}>
            { hasBeenEdited.includes('activity') ?
                <View style={styles.sliderView}>
                  <Text adjustsFontSizeToFit style={styles.answerText}> <Text style={[styles.answerText, {fontWeight: 'bold'}]}>Activity level:</Text> { this.activityText() } </Text>
                  <Slider
                    value={this.state.activity}
                    step={1}
                    minimumValue={1}
                    thumbTouchSize={{width: 60, height: 60}}
                    maximumValue={5}
                    trackStyle={styles.sliderTrack}
                    thumbStyle={styles.sliderThumb}
                    onValueChange={(value) => this.setState({activity: value})}
                  />
                </View>
              :
                <Text> What is your activity level? </Text>
              }           
            </TouchableOpacity>
                     
              <TouchableOpacity onPress={this.goalPicker} style={[styles.buttonStyles, activeEdit === 'goal' && styles.buttonActive]}>
                { hasBeenEdited.includes('goal') ?
                  <Text adjustsFontSizeToFit style={styles.answerText}> <Text style={[styles.answerText, {fontWeight: 'bold'}]}>Goal:</Text> {this.state.goal } </Text>
                  :
                  <Text> What is your overall goal? </Text>
                }
              </TouchableOpacity> 
           

            <TouchableOpacity onPress={this.goToProfile} style={[styles.buttonStyles, {backgroundColor: '#FE7C2A'}]}>
              <Text style={{color: 'white'}}> Start my fitness journey </Text>
            </TouchableOpacity>


          </View>
          <QuickPicker />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(BuildProfile)

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070'
  },
  sliderView: {
    alignItems: 'stretch', 
    justifyContent: 'space-around', 
    width: '90%',
  },
  sliderTrack: {
    height: '5%', 
    borderRadius: 5, 
    backgroundColor: '#707070',
  },
  sliderThumb: {
    width: 5, 
    height: '50%', 
    borderRadius: 5, 
    backgroundColor: '#FE7C2A'
  },
  bodyContainer: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  infoContainer: {
    flex: 3,
    backgroundColor: '#F8F8F8'
  },
  answerText: {
    textAlign: 'center', 
    color: '#FE7C2A', 
    fontSize: 11, 
    marginTop: 4,
  },
  questionsContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 30
  },
  buttonStyles: {
    borderRadius: 5, 
    borderWidth: 0.5,
    height: '13%',
    width: '100%',
    borderColor: '#707070', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  buttonActive: {
    borderColor: '#FE7C2A'
  }
})

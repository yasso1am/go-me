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
} from 'react-native'
import { Slider } from 'react-native-elements'

import { heightArray } from './SliderData'

class BuildProfile extends React.Component {

  state = {
    height: 66,
    weight: 150,
    activity: 3,
    activeEdit: '',
    hasBeenEdited: [],
  }
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  editActive = (subject) => {
    let updated = this.state.hasBeenEdited
    updated.push(subject)
      this.setState({ 
        activeEdit: subject, 
        editing: true, 
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
    const {height, weight, activity, hasBeenEdited } = this.state
    if ( hasBeenEdited.length !== 3){
      Alert.alert('Please answer all of the questions')
    } else {
      this.props.navigation.navigate('Profile')
    }
  }

  render() {
    const { activeEdit, hasBeenEdited } = this.state

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/gradient-logo.png')}/>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                <ImageBackground style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}} source={require('../../assets/images/placeholder-profile-image.png')}>
                  <TouchableOpacity style={{top: 50}} activeOpacity={0.5}> 
                    <Image style={{width: 30, height: 30 }} source={require('../../assets/images/camera-circle.png')} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                <Text> Good Afternoon, </Text>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}> Rachel Hilarius </Text>
                <Text style={{textAlign: 'center', paddingHorizontal: '10%'}}> Before you get started we need to know a couple of things </Text>
              </View>
          </View>
          
          <View style={styles.questionsContainer}>

            <TouchableOpacity onPress={ () => this.editActive('height')} style={[styles.buttonStyles, activeEdit === 'height' && styles.buttonActive]} >
              { hasBeenEdited.includes('height') ?
                <View style={{alignItems: 'stretch', justifyContent: 'space-around', width: '90%'}}>
                  <Slider
                    value={this.state.height}
                    step={1}
                    minimumValue={46}
                    maximumValue={90}
                    trackStyle={{height: '5%', borderRadius: 5, backgroundColor: '#707070'}}
                    thumbStyle={{width: 5, height: '50%', borderRadius: 5, backgroundColor: '#FE7C2A'}}
                    onValueChange={(value) => this.setState({height: value})}
                  />
                    <Text style={{ textAlign: 'center', color: '#FE7C2A', fontSize: 11, marginBottom: 3}}> Height: { heightArray[this.state.height]} </Text>
                </View>
              :
                <Text> How tall are you?</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.editActive('weight')} style={[styles.buttonStyles, activeEdit === 'weight' && styles.buttonActive]}>
              { hasBeenEdited.includes('weight') ?
                  <View style={{alignItems: 'stretch', justifyContent: 'space-around', width: '90%'}}>
                    <Slider
                      value={this.state.weight}
                      step={1}
                      minimumValue={50}
                      maximumValue={300}
                      trackStyle={{height: '5%', borderRadius: 5, backgroundColor: '#707070'}}
                      thumbStyle={{width: 5, height: '50%', borderRadius: 5, backgroundColor: '#FE7C2A'}}
                      onValueChange={(value) => this.setState({weight: value})}
                    />
                      <Text style={{ textAlign: 'center', color: '#FE7C2A', fontSize: 11, marginBottom: 3}}> Weight: { this.state.weight } Lbs </Text>
                  </View>
                :
                  <Text> What is your current weight? (lbs) </Text>
                }           
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.editActive('activity')} style={[styles.buttonStyles, activeEdit === 'activity' && styles.buttonActive]}>
            { hasBeenEdited.includes('activity') ?
                <View style={{alignItems: 'stretch', justifyContent: 'space-around', width: '90%'}}>
                  <Slider
                    value={this.state.activity}
                    step={1}
                    minimumValue={1}
                    maximumValue={5}
                    trackStyle={{height: '5%', borderRadius: 5, backgroundColor: '#707070'}}
                    thumbStyle={{width: 5, height: '50%', borderRadius: 5, backgroundColor: '#FE7C2A'}}
                    onValueChange={(value) => this.setState({activity: value})}
                  />
                    <Text style={{ textAlign: 'center', color: '#FE7C2A', fontSize: 11, marginBottom: 3}}> Activity level: { this.activityText() } </Text>
                </View>
              :
                <Text> Rate your activity Level </Text>
              }           
            </TouchableOpacity>
            
            {/*          
              <TouchableOpacity style={styles.buttonStyles}>
                <Text> What is your overall goal? </Text>
              </TouchableOpacity> 
            */}

            <TouchableOpacity onPress={this.goToProfile}style={[styles.buttonStyles, {backgroundColor: '#FE7C2A'}]}>
              <Text style={{color: 'white'}}> Start my fitness journey </Text>
            </TouchableOpacity>


          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#707070'
  },
  bodyContainer:{
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  infoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
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

export default connect()(BuildProfile)
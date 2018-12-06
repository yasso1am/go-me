import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { LinearGradient } from 'expo'
import QuickPicker from 'quick-picker'

import Header from '../nav/Header'


class Tracking extends React.Component{
  
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Workout Tracking',
    gesturesEnabled: false,
  }

  state = {
    date: new Date(),
    workoutType: 'Running',
    duration: '',
    caloriesBurned: '',
    distance: '',
    activeEdit: '',
    hasBeenEdited: [],
  }

  editActive = (subject) => {
    let updated = this.state.hasBeenEdited
    updated.push(subject)
      this.setState({ 
        activeEdit: subject, 
        hasBeenEdited: updated 
      })
  }


  pickDate = () => {
    const min = moment().subtract(45, 'days')._d
    const max = moment()._d
    this.editActive('date')
      QuickPicker.open({
        pickerType: 'date',
        mode: 'date',
        date: this.state.date,
        selectedValue: this.state.date,
        onValueChange: (date) => this.setState({date}),
        maximumDate: max,
        minimumDate: min,
        doneButtonTextStyle: { color: '#FE7C2A'},
        useNativeDriver: true,
        onTapOut: QuickPicker.close()
      })
  }

  enterDuration = () => {
    this.editActive('duration')
    this.setState({ duration: `${this.state.duration} Minutes`})
  }

  enterCalories = () => {
    this.editActive('caloriesBurned')
    this.setState({ caloriesBurned: `${this.state.caloriesBurned} Calories Burned`})
  }

  enterDistance = () => {
    this.editActive('distance')
    this.setState({ distance: `${this.state.distance} Miles`})
  }

  distanceTextChange = (distance) => {
    let decimalRegEx = new RegExp(/^\d*\.?\d*$/)
      if (distance.length === 0 || distance === "." || distance[distance.length - 1] === "." && decimalRegEx.test(distance)){
          this.setState({distance})
      } else {
          const distanceRegEx = new RegExp(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/)
            if ( distanceRegEx.test(distance)) this.setState({distance})
      }
  }

  pickWorkoutType = () => {
    this.editActive('workoutType')
      const activities = ['Running', 'Biking', 'Rowing']
        QuickPicker.open({
          items: activities,
          selectedValue: this.state.workoutType,
          onValueChange: (workoutType) => this.setState({ workoutType }),
          doneButtonTextStyle: { color: '#FE7C2A'},
          useNativeDriver: true,
          onTapOut: QuickPicker.close()

        })
  }
  
  stripDuration = () => {
    const {duration} = this.state
    if (duration.includes('Minutes')){
    let newDuration = duration.replace('Minutes', '')
      newDuration = newDuration.slice(0, -1)
      this.setState({duration: newDuration})
    }
  }

  stripCalories = () => {
    const {caloriesBurned} = this.state
    if (caloriesBurned.includes('Calories Burned')){
    let newCalories = caloriesBurned.replace('Calories Burned', '')
      newCalories = newCalories.slice(0, -1)
      this.setState({caloriesBurned: newCalories})
    }
  }

  stripDistance = () => {
    const {distance} = this.state
    if (distance.includes('Miles')){
    let newDistance = distance.replace('Miles', '')
      newDistance = newDistance.slice(0, -1)
      this.setState({distance: newDistance})
    }
  }

  goToGoals = () => {
    const { date, workoutType, duration, caloriesBurned, distance, hasBeenEdited } = this.state
    let formattedDate = moment(date).format('YYYY-MM-DD')
      if (hasBeenEdited.includes('workoutType') && hasBeenEdited.includes('duration') && hasBeenEdited.includes('date') && hasBeenEdited.includes('distance') ){
        let distanceNumber
        let durationNumber
        let caloriesNumber
        if (caloriesBurned.includes('Calories Burned')){
            caloriesNumber = caloriesBurned.replace('Calories Burned', '')
            caloriesNumber = Number(caloriesNumber.slice(0, -1))
        } else {
            caloriesNumber = Number(caloriesBurned)
        }
        if (duration.includes('Minutes')){
            durationNumber = duration.replace('Minutes', '')
            durationNumber = Number(durationNumber.slice(0, -1))
        } else {
            durationNumber = Number(duration)
        }
        if (distance.includes('Miles')){
          distanceNumber = distance.replace('Miles', '')
          distanceNumber = Number(distanceNumber.slice(0, -1))
      } else {
          distanceNumber = Number(distance)
      }
        const workout = {formattedDate, workoutType, durationNumber, caloriesNumber, distanceNumber}
          this.props.navigation.navigate('GoalSwiper', {workout})
        } else {
          Alert.alert('Please complete required fields')
          return
    }
  }

  render(){
    const {hasBeenEdited} = this.state
    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#FE7C2A'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: '#F1552D'}}>
         <Header navigation={this.props.navigation} />

          <LinearGradient
            colors={['#FE7C2A', '#F1552D']}
            style={styles.bodyContainer}
          >
            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={require('../../assets/images/lines.png')}>
            
              <View style={styles.infoContainer}>
              <KeyboardAwareScrollView 
                contentContainerStyle={{flex: 1}}
                style={{zIndex: 0, flex: 1}} 
              >
                <ScrollView 
                  contentContainerStyle={{ height: '100%', width: '100%'}} 
                  style={{height: '100%', width: '100%'}} 
                  scrollEnabled={false}
                  keyboardShouldPersistTaps="never"

                >
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text   
                    adjustsFontSizeToFit 
                    numberOfLines={1} 
                    style={{fontSize: 30, color: 'white', fontWeight: 'bold', textAlign: 'center'}}> Track your workout </Text>
                  <Text 
                    adjustsFontSizeToFit 
                    style={{textAlign: 'center', color: 'white', fontSize: 13, lineHeight: 20}}> Fill out the form below to keep up with your goals and active lifestyle </Text>
                </View>
                
                <View style={{flex: 5, width: '100%'}}>
                  
                  <TouchableOpacity
                    style={[styles.textInput, {justifyContent: 'center'}]}
                    onPress={this.pickWorkoutType}
                  > 
                    { hasBeenEdited.includes('workoutType') ?
                      <Text style={{color: '#FE7C2A'}}> {this.state.workoutType} </Text>
                      :
                      <Text style={{color: '#FE7C2A'}}>Workout Type</Text>
                    }
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.textInput, {justifyContent: 'center'}]}
                    onPress={this.pickDate}
                  > 
                    { hasBeenEdited.includes('date') ?
                    <Text style={{color: '#FE7C2A'}}> {moment(this.state.date).format('MMM Do YYYY')} </Text>
                    :
                    <Text style={{color: '#FE7C2A'}}>Date</Text>
                  }
                  </TouchableOpacity>

                  <TextInput 
                    style={[styles.textInput, {color: '#FE7C2A'}]} 
                    placeholder='Duration in Minutes'
                    value={this.state.duration}
                    onChangeText={ (duration) => this.setState({duration})}
                    onFocus={this.stripDuration}
                    onBlur={this.enterDuration}
                    placeholderTextColor="#FE7C2A"
                    keyboardType='number-pad'
                    returnKeyType='done'
                  />

                  <TextInput 
                    style={[styles.textInput, {color: '#FE7C2A'}]} 
                    placeholder='Calories Burned (optional)'
                    value={this.state.caloriesBurned}
                    onChangeText={ (caloriesBurned) => this.setState({caloriesBurned})}
                    onFocus={this.stripCalories}
                    onBlur={this.enterCalories}
                    placeholderTextColor="#FE7C2A"
                    keyboardType='number-pad'
                    returnKeyType='done'
                  />

                   <TextInput 
                    style={[styles.textInput, {color: '#FE7C2A'}]} 
                    placeholder='Distance (miles)'
                    value={this.state.distance}
                    onChangeText={this.distanceTextChange}
                    onFocus={this.stripDistance}
                    onBlur={this.enterDistance}
                    placeholderTextColor="#FE7C2A"
                    keyboardType='decimal-pad'
                    returnKeyType='done'
                  />

                    <TouchableOpacity onPress={this.goToGoals} style={[styles.textInput, {alignItems: 'center', justifyContent: 'center', borderColor: '#FE7C2A', backgroundColor: '#FE7C2A'}]}>
                      <Text style={{color: 'white'}}>Choose Goal To Track</Text> 
                    </TouchableOpacity>
                    </View>
                    </ScrollView>
                  </KeyboardAwareScrollView>
                </View>
                
              <View style={styles.buttonContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
                    <Image source={require('../../assets/icons/x-icon-white.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </SafeAreaView>
        <QuickPicker />
      </Fragment>    
    )
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FE7C2A',
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFF',
  },
  bodyContainer:{
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
  },
  textInput: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 7.5,
    paddingLeft: 15,
    height: '12%',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    backgroundColor: '#F8F8F8',
  },
})

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Tracking)
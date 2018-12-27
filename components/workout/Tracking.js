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
  Alert,
  ScrollView,
} from 'react-native'
import AppStyles from '../../AppStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo'
import QuickPicker from 'quick-picker'

import Header from '../nav/Header'

import { addWorkout, postWorkout, clearWorkout } from '../../reducers/workout'

const QuickpickerHeader = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
      <View style={{flexDirection: 'row', flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{textAlign: "center"}}> {props.text} </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity 
           adjustsFontSizeToFit 
           hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
           onPress={() => {
             QuickPicker.close()
             if (props.kind === "workout"){
               props.pickDate()
             } else {
               props.duration.focus()
             }
             }}
          >
          <Text style={{color: AppStyles.primaryColor, fontWeight: 'bold', fontSize: 16}}> Next </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


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

  componentDidUpdate(prevProps){
    if(prevProps.workout !== this.props.workout){
      this.refs.submitButton.setOpacityTo(100)
    }
  }

  editActive = (subject) => {
    const { hasBeenEdited } = this.state
    let updated = hasBeenEdited
    updated.push(subject)
      this.setState({ 
        activeEdit: subject, 
        hasBeenEdited: updated 
      })
      if(hasBeenEdited.includes('workoutType') && hasBeenEdited.includes('duration') && hasBeenEdited.includes('date') && hasBeenEdited.includes('distance') ) {
        this.refs.submitButton.setOpacityTo(100)
      }
  }

  pickWorkoutType = () => {
    this.editActive('workoutType')
      const activities = ['Running', 'Biking', 'Rowing']
        QuickPicker.open({
          items: activities,
          selectedValue: this.state.workoutType,
          onValueChange: (workoutType) => this.setState({ workoutType }),
          doneButtonTextStyle: { color: AppStyles.primaryColor},
          useNativeDriver: true,
          onTapOut: QuickPicker.close(),
          topRow: <QuickpickerHeader pickDate={this.pickDate} kind={"workout"} text="Select a Workout" />
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
        doneButtonTextStyle: { color: AppStyles.primaryColor},
        useNativeDriver: true,
        onTapOut: QuickPicker.close(),
        topRow: <QuickpickerHeader duration={this.duration} kind={"date"} text="What date did you workout?" />
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
        const workout = {
          distance: distanceNumber,
          date: formattedDate, 
          type: workoutType, 
          calories_burned: caloriesNumber, 
          duration: durationNumber
        }
          this.props.dispatch(addWorkout(workout))
          this.props.navigation.navigate('GoalSlider', {workout: workout})
        } else {
          Alert.alert('Please complete required fields')
          return
    }
  }

  backOrPost = () => {
    if (this.props.workout && this.props.workout.goal){
      this.props.dispatch(postWorkout())
    } else {
      this.props.navigation.goBack()
    }
  }

  cancelEverything = () => {
    Alert.alert(
      'Delete Workout',
      'Are you sure you want to delete this workout?',
      [
        {text: 'Cancel', onPress: () => console.log('cancelled'), style: 'cancel'},
        {text: 'Delete', onPress: () => {
            this.props.dispatch(clearWorkout()) 
            this.props.navigation.navigate('Profile')
          }
        }
      ],
      {cancelable: false } 
    )
  }

  render(){
    const {hasBeenEdited} = this.state
    const { workout } = this.props
    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: AppStyles.primaryColor}} />
        <SafeAreaView style={{flex: 1, backgroundColor: AppStyles.secondaryColor}}>
         <Header back={true} navigation={this.props.navigation} />

          <LinearGradient
            colors={[AppStyles.primaryColor, AppStyles.secondaryColor]}
            style={styles.bodyContainer}
          >
            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={require('../../assets/images/lines.png')}>
            
              <View style={styles.infoContainer}>
                <KeyboardAwareScrollView 
                  contentContainerStyle={{flex: 1}}
                  style={{zIndex: 0, flex: 1}}
                  extraScrollHeight={100}
                >
                  <ScrollView 
                    contentContainerStyle={{ height: '100%', width: '100%'}} 
                    style={{height: '100%', width: '100%'}} 
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
                  
                    <View style={{flex: 7, width: '100%'}}>

                    <TextInput 
                        style={[styles.textInput, {color: AppStyles.primaryColor}]} 
                        placeholder='Distance (miles)'
                        ref={ (input) => { this.distance = input }}
                        onSubmitEditing={ () => { this.pickWorkoutType() }}
                        value={this.state.distance}
                        onChangeText={this.distanceTextChange}
                        onFocus={this.stripDistance}
                        onBlur={this.enterDistance}
                        placeholderTextColor={AppStyles.primaryColor}
                        keyboardType='decimal-pad'
                        returnKeyType='done'
                      />
                      
                      <TouchableOpacity
                        style={[styles.textInput, {justifyContent: 'center'}]}
                        onPress={this.pickWorkoutType}
                      > 
                        { hasBeenEdited.includes('workoutType') ?
                          <Text style={{color: AppStyles.primaryColor}}> {this.state.workoutType} </Text>
                          :
                          <Text style={{color: AppStyles.primaryColor}}>Workout Type</Text>
                        }
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.textInput, {justifyContent: 'center'}]}
                        onPress={this.pickDate}
                      > 
                        { hasBeenEdited.includes('date') ?
                        <Text style={{color: AppStyles.primaryColor}}> {moment(this.state.date).format('MMM Do YYYY')} </Text>
                        :
                        <Text style={{color: AppStyles.primaryColor}}>Date</Text>
                      }
                      </TouchableOpacity>

                      <TextInput 
                        style={[styles.textInput, {color: AppStyles.primaryColor}]} 
                        placeholder='Duration in Minutes'
                        ref={ (input) => {this.duration = input }}
                        value={this.state.duration}
                        onChangeText={ (duration) => this.setState({duration})}
                        onFocus={this.stripDuration}
                        onBlur={this.enterDuration}
                        placeholderTextColor={AppStyles.primaryColor}
                        keyboardType='number-pad'
                        returnKeyType='done'
                        onSubmitEditing={ () => { this.calories.focus() }}
                      />

                      <TextInput 
                        style={[styles.textInput, {color: AppStyles.primaryColor}]} 
                        placeholder='Calories Burned (optional)'
                        ref={ (input) => {this.calories = input }}
                        value={this.state.caloriesBurned}
                        onChangeText={ (caloriesBurned) => this.setState({caloriesBurned})}
                        onFocus={this.stripCalories}
                        onBlur={this.enterCalories}
                        placeholderTextColor={AppStyles.primaryColor}
                        keyboardType='number-pad'
                        returnKeyType='done'
                      />

                      <TouchableOpacity
                        ref="submitButton"
                        onPress={this.goToGoals} 
                        style={[styles.textInput, {
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          borderColor: AppStyles.primaryColor, 
                          backgroundColor: hasBeenEdited.includes('workoutType') && hasBeenEdited.includes('duration') && hasBeenEdited.includes('date') && hasBeenEdited.includes('distance') ? AppStyles.primaryColor : '#707070', 
                          opacity: 0.3
                        }]}>
                        <Text style={{color: 'white'}}> { workout.goal ? workout.goal.name : "Choose Goal To Track" } </Text> 
                      </TouchableOpacity>

                    </View>
                  </ScrollView>
                </KeyboardAwareScrollView>
              </View>
                
              <View style={styles.buttonContainer}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                  {
                    this.props.workout && this.props.workout.goal &&
                      <TouchableOpacity onPress={this.cancelEverything}>
                        <Image source={require('../../assets/icons/x-icon-white.png')} />
                      </TouchableOpacity>
                  }

                  <TouchableOpacity onPress={this.backOrPost}>
                    <Image source={ this.props.workout && this.props.workout.goal ? require('../../assets/icons/check-icon-white.png') : require('../../assets/icons/x-icon-white.png')} />
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
  bodyContainer:{
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
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
  return { user: state.user, workout: state.workout }
}

export default connect(mapStateToProps)(Tracking)
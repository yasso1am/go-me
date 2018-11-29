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
} from 'react-native'

import { LinearGradient } from 'expo'
import QuickPicker from 'quick-picker'

import Header from '../nav/Header'


class Tracking extends React.Component{
  
  static navigationOptions = {
    header: null,
  }

  state = {
    date: new Date(),
    workoutType: 'Running',
    time: '',
    calories: '',
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
        useNativeDriver: true

      })
  }

  pickWorkoutType = () => {
    this.editActive('workoutType')
      const activities = ['Running', 'Biking', 'Rowing']
        QuickPicker.open({
          items: activities,
          selectedValue: this.state.workoutType,
          onValueChange: (workoutType) => this.setState({ workoutType }),
          doneButtonTextStyle: { color: '#FE7C2A'},
          useNativeDriver: true
        })
  }
  
  stripTime = () => {
    const {time} = this.state
    let newTime = time.replace('Minutes', '')
      newTime = newTime.slice(0, -1)
      this.setState({time: newTime})
  }

  stripCalories = () => {
    const {calories} = this.state
    let newCalories = calories.replace('Calories Burned', '')
      newCalories = newCalories.slice(0, -1)
      this.setState({calories: newCalories})
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
              <KeyboardAvoidingView style={{zIndex: 0, flex: 1}} behavior='position'>
                
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold', textAlign: 'center'}}> Track your workout </Text>
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 13, lineHeight: 20}}> Fill out the form below to keep up with your goals and active lifestyle </Text>
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

                  <TextInput 
                    style={[styles.textInput, {color: '#FE7C2A'}]} 
                    placeholder='Time in Minutes'
                    value={this.state.time}
                    onChangeText={ (time) => this.setState({time})}
                    onFocus={this.stripTime}
                    onSubmitEditing={ () => this.setState({ time: `${this.state.time} Minutes`})}
                    placeholderTextColor="#FE7C2A"
                    keyboardType='number-pad'
                    returnKeyType='done'
                  />

                  <TextInput 
                    style={[styles.textInput, {color: '#FE7C2A'}]} 
                    placeholder='Calories Burned'
                    value={this.state.calories}
                    onChangeText={ (calories) => this.setState({calories})}
                    onFocus={this.stripCalories}
                    onSubmitEditing= { () => this.setState({ calories: `${this.state.calories} Calories Burned`}) }
                    placeholderTextColor="#FE7C2A"
                    keyboardType='number-pad'
                    returnKeyType='done'
                  />

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

                    <TouchableOpacity style={[styles.textInput, {alignItems: 'center', justifyContent: 'center', borderColor: '#FE7C2A', backgroundColor: '#FE7C2A'}]}>
                      <Text style={{color: 'white'}}>Choose Goal To Track</Text> 
                    </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </View>
                
              <View style={styles.buttonContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <TouchableOpacity onPress={ () => this.props.navigation.goBack()}>
                    <Image source={require('../../assets/icons/x-icon-white.png')} />
                  </TouchableOpacity>
                </View>
              </View>
              <QuickPicker />
            </ImageBackground>
          </LinearGradient>
        </SafeAreaView>
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
    height: '14%',
    borderColor: '#FFFFFF',
    borderWidth: 0.5,
    backgroundColor: '#F8F8F8',
  },
})

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Tracking)
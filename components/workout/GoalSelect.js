import React from 'react'
import { connect } from 'react-redux'
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Platform,
  Dimensions,
} from 'react-native'
import Header from '../nav/Header'
import { addGoal } from '../../reducers/workout'

const { width } = Dimensions.get('window')

class GoalSelect extends React.Component{
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    headerBackTitle: 'Goal Select',
  }

  state = {
    completionAnimation: new Animated.Value(1),
  }

  componentDidMount(){
    this.startAnimations()
  }

  startAnimations = () => {
    const { completionAnimation, imageAnimation} = this.state
    const { goal } = this.props.navigation.state.params
    let completionPercentage = goal.type === 'Rowing' ? (parseFloat(goal.progress[0].distance_cumulative)/1000).toFixed(2) / goal.distance : parseFloat(goal.progress[0].distance_cumulative) / goal.distance
    let completionTotal = completionPercentage >= 1 ? width - 61 : ((width - 60) * completionPercentage)

      Animated.timing(completionAnimation, {
        toValue: completionTotal,
        duration: 1500
      }).start()
  }

  selectGoal = () => {
    const { navigation, dispatch } = this.props
    const { goal } = this.props.navigation.state.params
      dispatch(addGoal(goal))
      navigation.navigate('Tracking')
  }

  renderActivityIcon = () => {
    const { type } = this.props.navigation.state.params.goal
    switch (type){
      case "Running":
        return require('../../assets/icons/shoe.png')
      case "Biking":
        return require('../../assets/icons/bike.png')
      case "Rowing":
        return require('../../assets/icons/row.png')
      default:
        return
    }
  }

  startedOrNot = () => {
    const { goal } = this.props.navigation.state.params
    if (goal.progress[0].date_started){
      return goal.progress[0].date_started
    } else {
      return "N/A"
    }
  }

  render(){

    const { completionAnimation, imageAnimation } = this.state
    const completionStyle = { width: completionAnimation }
    const { goal } = this.props.navigation.state.params


    return(
      <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 25: 0,}}>
        <StatusBar
          barStyle="dark-content"
        />
        <Header color={'#fff'} navigation={this.props.navigation} />
        <View style={styles.selectContainer}>
          <Text 
            adjustsFontSizeToFit 
            numberOfLines={1} 
            style={styles.titleText}
          >
            Select Your Goal
          </Text>
          <Text
            adjustsFontSizeToFit 
            numberOfLines={2} 
            style={{fontSize: 12, fontWeight: '300', color: '#707070'}}
          >
            Select the goal below, in which you would like to attribute your workout to
          </Text>
          <Image fadeDuration={0} resizeMode="stretch" style={styles.image} source={{uri: goal.banner_image}} />
          
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Goal:</Text>
            <Text style={styles.detailsTextBlue}> {goal.name} </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Date Started:</Text>
            <Text style={styles.detailsTextBlue}> {this.startedOrNot()} </Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Distance Traveled</Text> 
            <Text style={styles.detailsTextBlue}>{goal.type ==='Rowing' ? (parseFloat(goal.progress[0].distance_cumulative)/1000).toFixed(2) : parseFloat(goal.progress[0].distance_cumulative)} / {goal.distance}</Text>
          </View>

        </View>
        <View style={styles.completionContainer}>
          <ScrollView 
            style={{height: '100%'}} 
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 30}}
          >
            <View style={[styles.detailsRow]}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}> Completion Progress </Text>
              <View style={[styles.progressBar]}>
                <Animated.View style={[styles.progressAmount, completionStyle]} />
              </View>
                <View style={[styles.textRow]}> 
                  <Text style={styles.detailsText}> 0 </Text>
                  <Text style={styles.detailsTextBlue}>{ goal.distance }</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTitle}> Activity Type </Text>
              <Image fadeDuration={0} style={{marginLeft: 5, marginTop: 10}} source={this.renderActivityIcon()} />
            </View>

            <View style={[styles.detailsRow, {height: 30, marginTop: 15}]}>
              <Text numberOfLines={1} style={styles.subTitle}> Calories Burned To Date </Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.detailsText}> {goal.progress[0].calories_burned_cumulative} calories</Text>
            </View>

             <View style={[styles.detailsRow, {height: 30}]}>
              <Text numberOfLines={1} style={styles.subTitle}> Time Tracked To Date</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.detailsText}> {goal.progress[0].duration_cumulative} minutes</Text>
            </View>

            <View style={[styles.detailsRow]}>
              <TouchableOpacity onPress={this.selectGoal} style={styles.button}>
                <Text style={{color: 'white', fontSize: 13}}> Select This Goal </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    flex: 2,
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 15,
  },
  completionContainer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#546E7A',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#546E7A',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailsText: {
    fontSize: 10, 
    color: '#707070',
  },
  detailsTextBlue: {
    fontSize: 10, 
    color: '#546E7A'
  },
  image: {
    width: '100%',
    height: '35%'
  },
  detailsRow: {
    height: 60,
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-around'
  },
  progressBar: {
    height: 10,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#546E7A',
  },
  progressAmount:{
    borderRadius: 5,
    backgroundColor: AppStyles.primaryColor,
    height: '90%',
  },
  button: {
    borderRadius: 5, 
    borderWidth: 1, 
    width: '100%',
    height: 50, 
    borderColor: AppStyles.primaryColor,
    backgroundColor: AppStyles.primaryColor,
    alignItems: 'center', 
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    workout: state.workout
  }
}

export default connect(mapStateToProps)(GoalSelect)
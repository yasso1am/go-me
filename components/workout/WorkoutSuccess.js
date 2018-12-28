import React from 'react'
import {connect} from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native'
import Header from '../nav/Header'
import AppStyles from '../../AppStyles'

import { clearGoals } from '../../reducers/goals'

class WorkoutSuccess extends React.Component{
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  }

  componentDidMount(){
    this.props.dispatch(clearGoals())
  }

  renderActivityIcon = () => {
    const { type } = this.props.navigation.state.params.workout
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

  render(){
    const { workout } = this.props.navigation.state.params
    debugger
    return(
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
        />
        <Header color={'#fff'} color={'#fff'} navigation={this.props.navigation} />
        <View style={{flex: 1, backgroundColor: '#F8F8F8', borderTopWidth: 0.5, borderTopColor: '#707070'}}>
          
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>You killed it,</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>Keep up the good work!</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTitle}>Screenshot this page and let the people know</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTitle}>that you destroyed your workout today!</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image resizeMode="contain" style={{height: '70%', width: '70%'}} source={require('../../assets/images/success-graphic.png')} />
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <ScrollView 
              style={{height: '100%'}} 
              contentContainerStyle={{flexGrow: 1, paddingHorizontal: 30, alignItems: 'center', justifyContent: 'space-around'}}
            >
              <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.subHeading, {fontSize: 15, fontWeight: 'bold'}]}>Post-Workout Stats</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subHeading}>Activity Type</Text>
              <Image source={this.renderActivityIcon} />
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subHeading}>Workout Time</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statsText}>{workout.duration} minutes</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subHeading}>Calories Burned</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statsText}>{workout.calories_burned} calories</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subHeading}>Distance Traveled</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.statsText}>{workout.distance} {workout.type === 'Rowing' ? "meters" : "miles"}</Text>

            </ScrollView>
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingBottom: 30,
    paddingTop: 15,
  },
  statsContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  imageContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#546E7A',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '300',
    color: '#707070',
  },
  subHeading: {
    color: '#546E7A',
    fontSize: 12,
    fontWeight: '600',
  },
  statsText: {
    color: AppStyles.primaryColor,
    fontSize: 20,
    fontWeight: 'bold'
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


export default connect()(WorkoutSuccess)
import React from 'react'
import { connect } from 'react-redux'
import { 
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native'
import moment from 'moment'
import AppStyles from '../../AppStyles'
import Header from '../nav/Header'

import { getGoalsWithWorkouts } from '../../reducers/goals'

const { width } = Dimensions.get('window')

class WorkoutHistory extends React.Component{
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  state = {
    activeActivity: 'Running',
    activeGoal: null
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getGoalsWithWorkouts(this.state.activeActivity))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.activeGoal !== this.state.activeGoal){
      this.setState({gactiveGoal: null})
    }
  }

  setActiveActivity = (activeActivity) => {
    const { dispatch } = this.props
    this.setState({activeActivity})
    dispatch(getGoalsWithWorkouts(activeActivity))
  }

  setActiveGoal = (goalId) => {
    const { activeGoal } = this.state
    if (goalId === activeGoal){
      this.setState({activeGoal: null})
    } else {
      this.setState({activeGoal: goalId})
    }
  }


  render(){
    const { goals } = this.props
    const { activeActivity, activeGoal } = this.state
    return(
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
        />
        <Header color={'#fff'} navigation={this.props.navigation} />
        <View style={{flex: 1, backgroundColor: '#F8F8F8', borderTopWidth: 0.5, borderTopColor: '#707070'}}>
          
          <View style={styles.selectContainer}>
            <View style={styles.selectRow}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}>Past Workouts</Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.detailsText}>Tap on each goal below to see your workouts</Text>
            </View>
            <View style={[styles.selectRow, {flexDirection: 'row'}]}>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActiveActivity('Running')}>
                <Image source={ activeActivity === 'Running' ? require('../../assets/icons/shoe.png'): require('../../assets/icons/shoe-green.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActiveActivity('Biking')}>
                <Image source={ activeActivity === 'Biking' ? require('../../assets/icons/bike.png') : require('../../assets/icons/bike-green.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActiveActivity('Rowing')}>
                <Image source={ activeActivity ==='Rowing' ? require('../../assets/icons/row.png') :  require('../../assets/icons/row-green.png')}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.goalScrollViewContainer}>
            <ScrollView 
              style={{height: '100%'}} 
              contentContainerStyle={{flexGrow: 1, paddingHorizontal: 30}}
              >
              { typeof goals ==='string' ?
                  <View>
                    <Text adjustsFontSizeToFit numberOfLines={1}>{`You have no tracked ${activeActivity.toLowerCase()} goals, start one!`}</Text>
                  </View>
                :
                  goals.map( goal => (
                    <View key={goal.id}>
                        <TouchableOpacity activeOpacity={0.8} onPress={ () => this.setActiveGoal(goal.id) } style={styles.imageContainer}>
                          <ImageBackground
                            key={goal.id} 
                            source={{uri: goal.banner_image}} 
                            resizeMode="stretch" 
                            style={styles.image}
                          >
                            <View style={[styles.imageDetailText, {flex: 2, alignItems: 'flex-start'}]}>
                              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.goalName}>{goal.name}</Text>
                            </View>
                            <View style={styles.imageDetailText}>
                              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.goalName}>{goal.type === 'Rowing' ? `${(parseFloat(goal.progress[0].distance_cumulative)/1000).toFixed(2)}` :  `${parseFloat(goal.progress[0].distance_cumulative).toFixed(2)}`}</Text>
                              <Text adjustFontSizeToFit numberOfLines={1} style={styles.goalName}>/</Text>
                              <Text adjustFontSizeToFit numberOfLines={1} style={styles.goalName}>{goal.distance} {goal.type === 'Rowing' ? "km" : "mi"}</Text>
                            </View>
                            <View style={styles.imageDetailText}>
                              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.goalName}>{moment(goal.updated_at).format('MM/DD')}</Text>
                            </View>
                          </ImageBackground>
                         
                        </TouchableOpacity>
                      {
                        activeGoal === goal.id &&
                          <View>
                            <View style={styles.headerColumns}>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>Date</Text> 
                              </View>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>Duration</Text>
                              </View>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>Calories</Text>
                              </View>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.headerText}>Distance</Text>
                              </View>
                            </View>

                          { goal.workouts.map( workout => (
                            <View key={workout.id} style={styles.dataColumns}>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={2} style={styles.dataText}>{moment(workout.date).format('MM/DD')}</Text> 
                              </View>
                              <View style={{flex: 1}}> 
                                <Text adjustsFontSizeToFit numberOfLines={2} style={styles.dataText}>{workout.duration} min</Text>
                              </View>
                              <View style={{flex: 1}}> 
                                  <Text adjustsFontSizeToFit numberOfLines={2} style={styles.dataText}>{workout.calories_burned} cal.</Text>
                              </View>
                              <View style={{flex: 1}}> 
                                  <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.dataText, {color: AppStyles.primaryColor}]}>{goal.type=== 'Rowing' ? (workout.distance/1000).toFixed(2) : workout.distance} {goal.type === 'Rowing' ? "km" : "miles"}</Text>
                              </View>
                            </View>
                            )
                          )}

                        </View>
                      }
                    </View>
                  ))
              }
            </ScrollView>
          </View>

        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  selectContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  goalScrollViewContainer: {
    flex: 3,
    alignItems: 'center',
  },
  selectRow: {
    flex: 1,
    justifyContent: 'space-around',
  },
  buttonSelect: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#546E7A',
    paddingTop: '10%'
  },
  detailsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#707070',
  },
  imageContainer: {
    marginTop: 15,
    marginBottom: 5,
    height: 75,
    width: width - 60
  },
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  imageDetailText: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goalName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13
  },
  headerColumns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#707070'
  },
  headerText: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#707070',
    fontSize: 10,
    textAlign: 'left',
  },
  dataColumns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 30,
  },
  dataText: {
    fontSize: 10,
    color: '#707070',
    textAlign: 'left',
    fontWeight: '600',
  },
})

const mapStateToProps = state => {
  return {
    goals: state.goals
  }
}

export default connect(mapStateToProps)(WorkoutHistory)
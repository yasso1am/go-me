import React from 'react'
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
  Dimensions,
} from 'react-native'
import Header from '../nav/Header'

const { width } = Dimensions.get('window')

class GoalSelect extends React.Component{
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    headerBackTitle: 'Goal Select',
  }

  state = {
    completionAnimation: new Animated.Value(1),
    caloriesAnimation: new Animated.Value(1),
    workoutsAnimation: new Animated.Value(1),
  }

  componentDidMount(){
    this.startAnimations()
  }

  startAnimations = () => {
    const { completionAnimation, caloriesAnimation, workoutsAnimation } = this.state
    let completionTotal = ((width - 60) * 0.6)
    let caloriesTotal = ((width - 60) * 0.4)
    let workoutsTotal = ((width - 60) * 0.8)
    Animated.stagger(200, [
      Animated.timing(completionAnimation, {
        toValue: completionTotal,
        duration: 1500
      }),
      Animated.timing(caloriesAnimation, {
        toValue: caloriesTotal,
        duration: 1500
      }),
      Animated.timing(workoutsAnimation, {
        toValue: workoutsTotal,
        duration: 1500
      })
    ]).start()
  }

  render(){
    const { completionAnimation, caloriesAnimation, workoutsAnimation } = this.state
    const completionStyle = { width: completionAnimation }
    const caloriesStyle = { width: caloriesAnimation}
    const workoutsStyle = { width: workoutsAnimation }


    return(
      <SafeAreaView style={{flex: 1}}>
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
          <Image style={styles.image} source={ require('../../assets/goal_images/great-wall.png')} />
          
          <View style={styles.textRow}>
            <Text style={{fontSize: 10, color: '#707070'}}>Goal:</Text>
            <Text style={{fontSize: 10, color: '#546E7A'}}>Great Wall of China</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{fontSize: 10, color: '#707070'}}>Date Started:</Text>
            <Text style={{fontSize: 10, color: '#546E7A'}}>10-20-2017</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={{fontSize: 10, color: '#707070'}}>Distance Traveled</Text> 
            <Text style={{fontSize: 10, color: '#546E7A'}}>800 miles</Text>
          </View>

        </View>
        <View style={styles.completionContainer}>
          <ScrollView style={{height: '100%'}} contentContainerStyle={{justifyContent: 'space-around', alignItems: 'center', padding: 30}}>
            <Text 
              adjustsFontSizeToFit 
              numberOfLines={1} 
              style={styles.titleText}
            >
              Completion Progress
            </Text>

            <View style={[styles.progressBar]}>
              <Animated.View style={[styles.progressAmount, completionStyle]} />
            </View>

            <Text 
              adjustsFontSizeToFit 
              numberOfLines={1} 
              style={styles.titleText}
            >
              Calories Burned
            </Text>

            <View style={styles.progressBar}>
            <Animated.View style={[styles.progressAmount, caloriesStyle]} />
            </View>

            <Text 
              adjustsFontSizeToFit 
              numberOfLines={1} 
              style={styles.titleText}
            >
              Workouts Tracked to Goal
            </Text>

            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressAmount, workoutsStyle]} />
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
    padding: 30,
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
    color: '#546E7A'
  },
  image: {
    width: '100%',
    height: '30%'
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  progressBar: {
    height: 10,
    width: '100%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#546E7A',
  },
  progressAmount:{
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: AppStyles.primaryColor,
    height: '90%',
  }
})

export default GoalSelect
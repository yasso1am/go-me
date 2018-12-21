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
    imageAnimation: new Animated.Value(0.2),
  }

  componentDidMount(){
    this.startAnimations()
  }

  startAnimations = () => {
    const { completionAnimation, imageAnimation} = this.state
    let completionTotal = ((width - 60) * 0.6)
    Animated.stagger(100, [
      Animated.timing(completionAnimation, {
        toValue: completionTotal,
        duration: 1500
      }),
      Animated.timing(imageAnimation, {
        toValue: 1,
        duration: 1000
      })
    ]).start()
  }

  selectGoal = () => {
    const { navigation, dispatch } = this.props
    const { goal } = this.props.navigation.state.params
      dispatch(addGoal(goal))
      navigation.navigate('Tracking')
  }

  render(){
    const { completionAnimation, imageAnimation } = this.state
    const completionStyle = { width: completionAnimation }
    const imageStyle = { opacity: imageAnimation}


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
          <Image resizeMode="stretch" style={styles.image} source={ require('../../assets/goal_images/great-wall-banner.png')} />
          
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Goal:</Text>
            <Text style={styles.detailsTextBlue}>Great Wall of China</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Date Started:</Text>
            <Text style={styles.detailsTextBlue}>10-20-2017</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.detailsText}>Distance Traveled</Text> 
            <Text style={styles.detailsTextBlue}>800 miles</Text>
          </View>

        </View>
        <View style={styles.completionContainer}>
          <ScrollView 
            style={{height: '100%'}} 
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 30}}
          >
            <View style={[styles.detailsRow, {marginTop: 15}]}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.titleText}> Completion Progress </Text>
              <View style={[styles.progressBar]}>
                <Animated.View style={[styles.progressAmount, completionStyle]} />
              </View>
                <View style={[styles.textRow, {bottom: 10}]}> 
                  <Text style={styles.detailsText}> 0 </Text>
                  <Text style={styles.detailsTextBlue}>1200 miles</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.subTitle}> Activity Type </Text>
              <Animated.Image style={[imageStyle, {marginLeft: 5}]} source={require('../../assets/icons/shoe.png')} />
            </View>

            <View style={[styles.detailsRow, {marginTop: 15}]}>
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
    height: 80,
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
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
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
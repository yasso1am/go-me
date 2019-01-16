import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import SliderEntry from './SliderEntry'
import AppStyles from '../../AppStyles'

import { getGoals } from '../../reducers/goals'

const deviceWidth = Dimensions.get('window').width
const sliderWidth = Math.round(deviceWidth * .85 )

import Header from '../nav/Header'

class GoalSlider extends React.PureComponent{
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
    headerBackTitle: 'Goal Select',
  }

  state = {
    sliderActiveSlide: 0,
  }

  componentDidMount = () => {
    const { workout } = this.props
    debugger
    this.props.dispatch(getGoals(workout.type))
  }

  render(){
    const { sliderActiveSlide } = this.state
    const { goals } = this.props
    debugger
    return(
      <Fragment>
         <SafeAreaView style={{flex: 0, paddingTop: Platform.OS === 'android' ? 25: 0, backgroundColor: AppStyles.primaryColor}} />
          <StatusBar
            barStyle="light-content"
            backgroundColor={AppStyles.primaryColor}
          />
        <SafeAreaView style={{flex: 1, backgroundColor: AppStyles.secondaryColor}}>
       <Header back={true} navigation={this.props.navigation} />
        <LinearGradient
          colors={[AppStyles.primaryColor, AppStyles.secondaryColor]}
          style={styles.bodyContainer}
        >
          <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={require('../../assets/images/lines.png')}>

            <View style={styles.titleContainer}>
              <Text 
                adjustsFontSizeToFit 
                numberOfLines={1} 
                style={styles.headerText}
              > 
                Choose Your Goal 
              </Text>
            </View>

            <View style={styles.sliderContainer}>
              { goals ? 

                <Carousel
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  sliderWidth={deviceWidth}
                  itemWidth={sliderWidth}
                  inactiveSlideScale={0.90}
                  inactiveSlideOpacity={0.75}
                  data={goals}
                  renderItem={ ({item, index}) => {
                    return (
                      <SliderEntry navigation={this.props.navigation} item={item} index={index} />
                    )
                  }}
                  useScrollView={true}
                  swipeThreshold={45}
                  // enableSnap={true}
                  overScrollMode='always'
                  onSnapToItem={(index) => this.setState({sliderActiveSlide: index})}
                />

                :
                  <View style={styles.sliderContentContainer}>
                    <ActivityIndicator size="large" color={AppStyles.primaryColor} />
                  </View>

              }
              <Pagination
                dotsLength={goals.length}
                dotStyle={styles.activeDot}
                inactiveDotStyle={styles.inactiveDot}
                activeDotIndex={sliderActiveSlide}
                containerStyle={styles.paginationContainer}
              />
            </View>

              <View style={styles.lowerContainer}>
                <Text style={{color: 'white', fontSize: 11, opacity: 0.9}}> Tap to select </Text>
              </View>
          </ImageBackground>
        </LinearGradient>
        </SafeAreaView>
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
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center'
  },
  sliderContainer:{
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
  },
  sliderContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  paginationContainer: {
    paddingVertical: 10,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: -3,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderColor: 'white',
    marginHorizontal: -3,
  }
})

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    workout: state.workout
  }
}

export default connect(mapStateToProps)(GoalSlider)
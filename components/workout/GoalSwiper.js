import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import SliderEntry from './SliderEntry'
import { data } from './GoalData'
import { postWorkout } from '../../reducers/workout'


const deviceWidth = Dimensions.get('window').width
const sliderWidth = Math.round(deviceWidth * .85 )


import Header from '../nav/Header'


class GoalSwiper extends React.Component{
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  state = {
    sliderActiveSlide: 0,
  }

  selectGoal = (goal) => {
    const { goal_id } = goal
    const { workout } = this.props.navigation.state.params
      this.props.dispatch(postWorkout(workout, goal_id))
  }

  render(){
    const { sliderActiveSlide } = this.state
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
              <Carousel
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                sliderWidth={sliderWidth}
                itemWidth={sliderWidth}
                inactiveSlideScale={0.90}
                inactiveSlideOpacity={0.75}
                data={data}
                renderItem={ ({item, index}) => {
                  return (
                    <SliderEntry item={item} index={index} selectGoal={this.selectGoal} />
                  )
                }}
                useScrollView={true}
                swipeThreshold={45}
                enableSnap={true}
                onSnapToItem={(index) => this.setState({sliderActiveSlide: index})}
              />
              <Pagination
                dotsLength={data.length}
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
    overflow: 'visible'
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

export default connect()(GoalSwiper)
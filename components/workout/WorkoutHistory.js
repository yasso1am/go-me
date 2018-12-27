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
} from 'react-native'
import AppStyles from '../../AppStyles'
import Header from '../nav/Header'

import { getGoalsWithWorkouts } from '../../reducers/goals'

class WorkoutHistory extends React.Component{
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  state = {
    active: 'Running'
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getGoalsWithWorkouts(this.state.active))
  }

  setActive = (activity) => {
    this.setState({active: activity})
  }
  
  render(){
    const { active } = this.state
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
              <Text  adjustsFontSizeToFit numberOfLines={1} style={styles.detailsText}>Click on each goal below to see your workouts</Text>
            </View>
            <View style={[styles.selectRow, {flexDirection: 'row'}]}>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActive('Running')}>
                <Image source={ active === 'Running' ? require('../../assets/icons/shoe.png'): require('../../assets/icons/shoe-green.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActive('Biking')}>
                <Image source={ active === 'Biking' ? require('../../assets/icons/bike.png') : require('../../assets/icons/bike-green.png')}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSelect} onPress={ () => this.setActive('Rowing')}>
                <Image source={ active ==='Rowing' ? require('../../assets/icons/row.png') :  require('../../assets/icons/row-green.png')}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.goalScrollViewContainer}>
            <ScrollView style={{height: '100%'}} contentContainerStyle={{flexGrow: 1, paddingHorizontal: 30}}>
              
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
})

export default connect()(WorkoutHistory)
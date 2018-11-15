import React from 'react'
import {
  View, 
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native'
import { connect } from 'react-redux'


import { logout, getProfile } from '../../reducers/user'
import { heightArray } from './PickerData'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height



class BuildProfile extends React.Component {

  state = {
    height: '',
    pickerVisible: true,
    animation: new Animated.Value(0)
  }
  
  static navigationOptions = {
    header: null
  }

  

  // renderItem = ({item}) => {
  //   return (
  //     <Text> {item.label} </Text>
  //   )
  // }

  // _keyExtractor = (item, index) => index.toString()

  // togglePicker = (subject) => {
  //   Animated.timing(this.state.animation, {
  //     toValue: -300,
  //     duration: 400
  //   }).start()
  // }
  
  // closePicker = () => {
  //   debugger
  //   Animated.timing(this.state.animation, {
  //     toValue: 300,
  //     duration: 400
  //   }).start()
  // }

  // renderListHeader = () => {
  //   return (
  //     <View style={{flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'space-between'}}>
  //       <View style={{flex: 1, width: '1'}}></View>
  //         <View style={{flex: 1}}>
  //           <Text> Select your height </Text>
  //         </View>
  //       <View style={{flex: 1}}>
  //         <TouchableOpacity style = { styles.button}onPress={this.closePicker}>
  //           <Text> Back </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   )
  // }

  // renderPicker = () => {
  //   const { pickerVisible, height } = this.state
  //   const animatedStyle = {
  //     transform: [
  //       { translateY: this.state.animation }
  //     ]
  //   }
  //     return(
  //       <Animated.View style={[animatedStyle, {position: 'absolute', bottom: -deviceHeight - 20, left: 0, right: 0, backgroundColor: '#FE7C2A'}]}>
  //         <FlatList
  //           listHeaderComponent={this.renderListHeader()}
  //           data={heightArray}
  //           renderItem={this.renderItem}
  //           keyExtractor={this._keyExtractor}
  //         />
  //       </Animated.View>
  //     )
  // }
  
  render() {
    const { pickerVisible } = this.state

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/gradient-logo.png')}/>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                <ImageBackground style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}} source={require('../../assets/images/placeholder-profile-image.png')}>
                  <TouchableOpacity style={{top: 50}} activeOpacity={0.5}> 
                    <Image style={{width: 30, height: 30 }} source={require('../../assets/images/camera-circle.png')} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                <Text> Good Afternoon, </Text>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}> Rachel Hilarius </Text>
                <Text style={{textAlign: 'center', paddingHorizontal: '10%'}}> Before you get started we need to know a couple of things </Text>
              </View>
          </View>
          
          <View style={styles.questionsContainer}>

            <TouchableOpacity onPress={ () => this.props.dispatch(getProfile()) } style={styles.buttonStyles}>
              <Text> How tall are you?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ f => f } style={styles.buttonStyles}>
              <Text> What is your current weight? (lbs) </Text>            
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyles}>
              <Text> Rate your activity level </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyles}>
              <Text> What is your overall goal? </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.dispatch(logout(this.props.navigation)) }style={[styles.buttonStyles, {backgroundColor: '#FE7C2A'}]}>
              <Text style={{color: 'white'}}> Start my fitness journey </Text>
            </TouchableOpacity>

            {/* {this.renderPicker()} */}

          </View>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  bodyContainer:{
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },
  infoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },
  questionsContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 30
  },
  buttonStyles: {
    borderRadius: 5, 
    borderWidth: 0.5,
    height: '13%',
    width: '100%',
    borderColor: '#707070', 
    alignItems: 'center', 
    justifyContent: 'center',
  }
})

export default connect()(BuildProfile)
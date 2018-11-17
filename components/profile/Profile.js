import React from 'react'
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native'
import {
  LinearGradient
} from 'expo'

class Profile extends React.Component{
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  render(){
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#FE7C2A'}}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/white-logo.png')}/>
        </View>
        <LinearGradient
          colors={['#FE7C2A', '#F1552D']}
          style={styles.bodyContainer}
        >
          <View style={styles.infoContainer}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
              <ImageBackground style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}} source={require('../../assets/images/placeholder-profile-image.png')}>
                <TouchableOpacity style={{top: 50}} activeOpacity={0.5}> 
                  <Image style={{width: 30, height: 30 }} source={require('../../assets/images/camera-circle.png')} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={{ flex: 4, alignItems: 'center', justifyContent: 'space-around'}}>
              <Text style={{color: 'white', fontSize: 14}}> Good Afternoon, </Text>
              <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}> Rachel Hilarius </Text>
              <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Already kill your workout? </Text>
              <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Keep up with your goal by tracking it below. </Text>

            </View>
          
          </View>

        </LinearGradient>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30
  },
})

export default Profile
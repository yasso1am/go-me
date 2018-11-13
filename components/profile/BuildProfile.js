import React from 'react'
import {
  View, 
  Text,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import { connect } from 'react-redux'
import { logout } from '../../reducers/user'


class BuildProfile extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/gradient-logo.png')}/>
        </View>

        <View style={styles.bodyContainer}>
          <View style={styles.infoContainer}>
              <View>
                <ImageBackground style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}} source={require('../../assets/images/placeholder-profile-image.png')}>
                  <TouchableOpacity style={{top: 50}} activeOpacity={0.5}> 
                    <Image style={{width: 40, height: 40, opacity: 0.8}} source={require('../../assets/images/placeholder-camera-icon.png')} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View>
                <Text>Good Afternoon,</Text>
                <Text style={{fontSize: 20}}>Rachel Hilarius</Text>
              </View>
          </View>
          <View style={styles.questionsContainer}>
            <Button
              title="Sign out"
              onPress={() => {
                this.props.dispatch(logout())
                this.props.navigation.navigate('AuthHome')
              }}
            />
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  },
  questionsContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8'
  }
})

export default connect()(BuildProfile)
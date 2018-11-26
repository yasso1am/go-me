import React, { Fragment } from 'react'
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native'
import { LinearGradient } from 'expo'

import Header from '../nav/Header'


class Profile extends React.Component{
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  render(){
    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#FE7C2A'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: '#F1552D'}}>
          
         <Header />

          <LinearGradient
            colors={['#FE7C2A', '#F1552D']}
            style={styles.bodyContainer}
          >
            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={require('../../assets/images/lines.png')}>
              <View style={styles.infoContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                  <ImageBackground style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100}} source={require('../../assets/images/placeholder-profile-image.png')}>
                  </ImageBackground>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontSize: 14}}> Good Afternoon, </Text>
                  <Text 
                    adjustsFontSizeToFit 
                    numberOfLines={1}
                    style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}> 
                      Rachel Hilarius 
                  </Text>
                  <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Already kill your workout? </Text>
                  <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Keep up with your goal by tracking it below. </Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                  <TouchableOpacity>
                    <Image source={require('../../assets/icons/plus-icon-white.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </LinearGradient>
        </SafeAreaView>
      </Fragment>    
    )
  }
}

const styles = StyleSheet.create({
  header:{
    flex: 1,
    flexDirection: 'row',
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
    flex: 1,
    width: '100%',
  },
})

export default Profile
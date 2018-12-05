import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { 
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native'
import { LinearGradient } from 'expo'

import Header from '../nav/Header'
import { getProfile } from '../../reducers/user'


class Profile extends React.Component{
  
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

  componentDidMount(){
    const { dispatch } = this.props
      dispatch(getProfile())
  }

  render(){
    const image = this.props.user.avatar !== '' ? {uri: this.props.user.avatar} : require('../../assets/icons/default-avatar.png')

    return(
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: '#FE7C2A'}} />
          <StatusBar
            barStyle="light-content"
            backgroundColor="#FE7C2A"
          />
        <SafeAreaView style={{flex: 1, backgroundColor: '#F1552D'}}>
          
         <Header navigation={this.props.navigation} />

          <LinearGradient
            colors={['#FE7C2A', '#F1552D']}
            style={styles.bodyContainer}
          >
            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} source={require('../../assets/images/lines.png')}>
              
              <View style={styles.infoContainer}>

              <View style={{flex: 2}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}> 
                  <Image style={{alignItems: 'center', justifyContent: 'center', width: 100, height: 100, borderRadius: 50}} source={image} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{color: 'white', fontSize: 14}}> Good Afternoon, </Text>
                  <Text 
                    adjustsFontSizeToFit 
                    numberOfLines={1}
                    style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}> 
                      {this.props.user.name}
                  </Text>
                  <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Already kill your workout? </Text>
                  <Text style={{textAlign: 'center', paddingHorizontal: '10%', fontSize: 13, color: 'white'}}> Keep up with your goal by tracking it below. </Text>
                </View>
              </View>
              
              <View style={{flex: 1}} />

              </View>

              <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={ () => this.props.navigation.navigate('Tracking')}>
                    <Image resizeMode='contain' source={require('../../assets/icons/plus-icon-white.png')} />
                  </TouchableOpacity>
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
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
 
})

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)
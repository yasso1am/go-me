import React from 'react';
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor } from './store'
import NavigationService from './NavigationService'


import Loading from './components/auth/Loading'
import CheckUser from './components/auth/CheckUser'
import AuthHome from './components/auth/AuthHome'
import LoginAndRegister from './components/auth/LoginAndRegister'
import ForgotPassword from './components/auth/ForgotPassword'

import BuildProfile from './components/profile/BuildProfile'

const RootStack = createStackNavigator(
  {
    AuthHome: {screen: AuthHome},
    Login: { screen: LoginAndRegister},
    Register: { screen: LoginAndRegister },
    ForgotPassword: {screen: ForgotPassword},
    Profile: { screen: BuildProfile },
  },
  { 
    navigationOptions: {
      headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
      headerTintColor: '#F1552D',
    }
  }
)

export default class App extends React.Component {
  state = { remembered: null, }
  
  isLoaded = async (response) => {
    if (await response.result === true){
      let token = response.token
      this.setState({ 
        remembered: true 
      }, () => {
        let {remembered} = this.state  
        NavigationService.navigate('Profile', { remembered } )
      })
    } else {
      this.setState({remembered: false})
        NavigationService.navigate('AuthHome')
    }
  }

  render() {
    const { remembered } = this.state

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading remembered={remembered}/>} persistor={persistor}>
          <CheckUser isLoaded={this.isLoaded} />
            {remembered !== null &&
                <RootStack ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef)
                }}/>
            }
        </PersistGate>
      </Provider>
    );
  }
}
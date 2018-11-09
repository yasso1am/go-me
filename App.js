import React from 'react';
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor } from './store'
import NavigationService from './NavigationService'


import Loading from './Components/Auth/Loading'
import CheckUser from './Components/Auth/CheckUser'

import AuthHome from './Components/Auth/AuthHome'
import LoginAndRegister from './Components/Auth/LoginAndRegister'
import ForgotPassword from './Components/Auth/ForgotPassword'

import Profile from './Components/Profile'

const RootStack = createStackNavigator(
  {
    AuthHome: AuthHome,
    Login: LoginAndRegister,
    Register: LoginAndRegister,
    ForgotPassword: ForgotPassword,
    Profile: Profile,
  },
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
        <PersistGate loading={<Loading />} persistor={persistor}>
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
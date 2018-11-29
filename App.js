import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import NavigationService from './NavigationService'

import Loading from './components/auth/Loading'
import CheckUser from './components/auth/CheckUser'
import AuthHome from './components/auth/AuthHome'
import LoginAndRegister from './components/auth/LoginAndRegister'
import ForgotPassword from './components/auth/ForgotPassword'

import Profile from './components/profile/Profile'
import BuildProfile from './components/profile/BuildProfile'

import Tracking from './components/workout/Tracking'

const AuthStack = createStackNavigator(
  {
    AuthHome: {screen: AuthHome},
    Login: { screen: LoginAndRegister},   
    Register: { screen: LoginAndRegister },
    ForgotPassword: {screen: ForgotPassword},
  },
  { 
    navigationOptions: {
      headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
      headerTintColor: '#F1552D',
    }
  }
)

const AppStack = createStackNavigator(
  {
    BuildProfile: { screen: BuildProfile },
    Profile: {screen: Profile },
    Tracking: {screen: Tracking },
  },
  { 
    initialRouteName: 'Profile',
    navigationOptions: {
      headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
      headerTintColor: '#F1552D',
    }
  }
)

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: CheckUser,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

export default class App extends React.Component {

  render() {

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            { bootstrapped => (
                bootstrapped &&
                  <AppContainer ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                  }}/>
            )}
        </PersistGate>
      </Provider>
    );
  }
}
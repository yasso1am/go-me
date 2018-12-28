import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import NavigationService from './NavigationService'

import CheckUser from './components/auth/CheckUser'
import AuthHome from './components/auth/AuthHome'
import LoginAndRegister from './components/auth/LoginAndRegister'
import ForgotPassword from './components/auth/ForgotPassword'

import Profile from './components/profile/Profile'
import ProfileSettings from './components/profile/ProfileSettings'
import BuildProfile from './components/profile/BuildProfile'

import Tracking from './components/workout/Tracking'
import GoalSlider from './components/workout/GoalSlider'
import WorkoutHistory from './components/workout/WorkoutHistory'
import GoalSelect from './components/workout/GoalSelect'

import DrawerContent from './components/nav/DrawerContent'

  
  const AuthStack = createStackNavigator(
    {
      AuthHome: {screen: AuthHome},
      Login: { screen: LoginAndRegister},   
      Register: { screen: LoginAndRegister },
      ForgotPassword: {screen: ForgotPassword},
      BuildProfile: { screen: BuildProfile },
    },
    { 
      navigationOptions: {
        headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
        headerTintColor: '#F1552D',
      }
    }
  )

  const MainStack = createStackNavigator(
    {
      Profile: { screen: Profile},
      Tracking: { screen: Tracking },
      GoalSlider: {screen: GoalSlider },
      GoalSelect: {screen: GoalSelect},
      ProfileSettings: { screen: ProfileSettings },
      WorkoutHistory: { screen: WorkoutHistory },
    },
    {
      initialRouteName: 'WorkoutHistory',
      navigationOptions: {
        headerBackTitleStyle: {color: '#F1552D', fontSize: 11},
        headerTintColor: '#F1552D',
      },
    }
  )

  const AppStack = createDrawerNavigator(
    {
      MainStack: { screen: MainStack },
    },
    { 
      initialRouteName: 'MainStack',
      contentComponent: DrawerContent,
      drawerPosition: 'right',
    }
    )
    
    MainStack.navigationOptions = () => ({ 
      drawerLockMode: 'locked-closed', 
    })
     
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
                  <AppContainer ref={ navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                  }}/>
            )}
        </PersistGate>
      </Provider>
    );
  }
}
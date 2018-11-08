import React from 'react';
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor } from './store'
import NavigationService from './NavigationService'


import Login from './Components/Auth/Login'
import CheckUser from './Components/Auth/CheckUser'
import Loading from './Components/Auth/Loading'

import Profile from './Components/Profile'

const RootStack = createStackNavigator(
  {
  Login: Login,
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
        NavigationService.navigate('Login')
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
import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { store } from '../store'
import NavigationService from '../NavigationService'

import { getProfile } from './user'


const LOGOUT = 'LOGOUT'
const BASE_URL = 'https://app.gome.fit/api'
const TOKEN = 'TOKEN'
const AUTH_URL = 'https://app.gome.fit/api/v1'


const axiosInstanceCall = (token) => {
  const axiosInstance = axios.create()
    return new Promise( (resolve, reject) => {
      axiosInstance.post(`${BASE_URL}/refresh`, {refresh_token: token.refresh_token} )
      .then( res => {
        if (res.data.token.error !== "invalid_request"){
          console.log('refreshing token')
          resolve(res.data.token)
        } else {
          store.dispatch({type: LOGOUT})
          Alert.alert('Session has ended, please sign in again')
          NavigationService.navigate('AuthHome')
          reject('Token refresh has failed')
        }
      })
      .catch( err => {
        store.dispatch({type: LOGOUT})
        Alert.alert('Session has ended, please sign in again')
        NavigationService.navigate('AuthHome')
        reject('Token refresh has failed')
      })
    })
}

export const validateToken = async () => {
  let storedToken;
    try {
      storedToken = await AsyncStorage.getItem(TOKEN)
    } catch ( err ) {
      console.log('Error retrieving token')
    }
  return new Promise( (resolve, reject) => {
    let token = JSON.parse(storedToken)
      axios.post(`${BASE_URL}/refresh`, {refresh_token: token.refresh_token} )
        .then( async (res) => {
          if (res.data.token.error !== "invalid_request"){
            try {
              let token = res.data.token
              const tenMinutesFromNow = Date.now() + (token.expires_in * 1000)
              token.expires_on = tenMinutesFromNow
              let tokenToStore = JSON.stringify(token)
                await AsyncStorage.setItem(TOKEN, tokenToStore)
                console.log('New token stored')
                store.dispatch(getProfile())
                console.log('refreshing the user object')
            } catch (err) {
              console.log('error storing the token')
            }
            resolve(true)
          } else {
            console.log('The refresh token expired, make user sign in again')
            resolve(false)
          }
        })
        .catch( err => {
          reject(false)
        })
      })
}

axios.interceptors.request.use( async (config) => {
  if ( config.url.indexOf('https://app.gome.fit/api/v1') > -1 ){
    
    const storedToken = await AsyncStorage.getItem(TOKEN)
    let token = JSON.parse(storedToken)
    const expired = Date.now() > token.expires_on
    console.log(`expired = ${expired}`)
      if (expired){
        console.log('attempting to refresh')
        const tokenResponse = await axiosInstanceCall(token)
          if (tokenResponse){
            config.headers.common.authorization = `Bearer ${tokenResponse.access_token}`
            try {
            let token = tokenResponse
            const tenMinutesFromNow = Date.now() + (tokenResponse.expires_in * 1000)
            token.expires_on = tenMinutesFromNow
            let tokenToStore = JSON.stringify(token)
              await AsyncStorage.setItem(TOKEN, tokenToStore)
              console.log('New token stored')
            } catch (err) {
                console.log('Failed while trying to store the new token')
                store.dispatch({type: LOGOUT})
                Alert.alert('Session has ended, please sign in again')
                NavigationService.navigate('AuthHome')
            }
          } else {
            console.log('Token response from server was a failure')
            store.dispatch({type: LOGOUT})
            Alert.alert('Session has ended, please sign in again')
            NavigationService.navigate('AuthHome')
          }
      } else {
        config.headers.common.authorization = `Bearer ${token.access_token}`
      } 
    return config
  } else {
    return config
  }
}, error => Promise.reject(error))


export default ( state = {}, action ) => {
  switch(action.type) {
    default:
      return state;
  }
}
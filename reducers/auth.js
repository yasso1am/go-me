import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { store } from '../store'
import NavigationService from '../NavigationService'

const LOGOUT = 'LOGOUT'
const BASE_URL = 'https://app.gome.fit/api'
const TOKEN = 'TOKEN'
const AUTH_URL = 'https://app.gome.fit/api/v1'

export const validateToken = async () => {
	try {
    const storedToken = await AsyncStorage.getItem(TOKEN)
    const token = JSON.parse(storedToken)
    const res = await axios.post(`${BASE_URL}/refresh`, {refresh_token: token.refresh_token} )
		const newToken = res.data.token
		const expirationDelay = Date.now() + ((newToken.expires_in - 15) * 1000)
		  newToken.expires_on = expirationDelay
		const tokenToStore = JSON.stringify(newToken)
		  await AsyncStorage.setItem(TOKEN, tokenToStore)
		  return true
	} catch (err) {
      return false
	}
}

const axiosInstanceCall = async (token) => {
  try {
    const axiosInstance = axios.create()
    const res = await axiosInstance.post(`${BASE_URL}/refresh`, {refresh_token: token.refresh_token} )
    return res.data.token
  } catch (err) {
    store.dispatch({type: LOGOUT})
    Alert.alert('Session has ended, please sign in again')
    NavigationService.navigate('AuthHome')
    return false
  }
}

axios.interceptors.request.use( async ( config ) => {
  try {
    if (config.url.indexOf(AUTH_URL) == -1) {
      return config
    } else {
        const storedToken = await AsyncStorage.getItem(TOKEN)
        let token = JSON.parse(storedToken)
        const expired = Date.now() > token.expires_on
          if (expired) {
            const newToken = await axiosInstanceCall(token)
            if ( newToken ) {
              config.headers.common.authorization = `Bearer ${newToken.access_token}`
              const expirationDelay = Date.now() + ((newToken.expires_in - 15) * 1000)
              newToken.expires_on = expirationDelay
              const tokenToStore = JSON.stringify(newToken)
              await AsyncStorage.setItem(TOKEN, tokenToStore)
            }
          } else {
              config.headers.common.authorization = `Bearer ${token.access_token}`
              return config
          }
      } 
      return config
  } catch (err) {

  }
}, error => Promise.reject(error))

export default ( state = {}, action ) => {
  switch(action.type) {
    default:
      return state;
  }
}
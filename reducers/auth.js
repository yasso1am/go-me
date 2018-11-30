import axios from 'axios'
import { Alert } from 'react-native'
import { store } from '../store'
import NavigationService from '../NavigationService'

import { getProfile } from './user'

const LOGOUT = 'LOGOUT'
const BASE_URL = 'https://app.gome.fit/api'
const TOKEN = 'TOKEN'
const AUTH_URL = 'https://app.gome.fit/api/v1'

export const validateTokenAndUser = async () => {
	try {
    const storedToken = store.getState().auth
    const res = await axios.post(`${BASE_URL}/refresh`, {refresh_token: storedToken.refresh_token} )
    const newToken = res.data.token
		const expirationDelay = Date.now() + ((newToken.expires_in - 15) * 1000)
    newToken.expires_on = expirationDelay
      store.dispatch({type: TOKEN, token: newToken})
      const user = await getProfile()
		    return true
	} catch (err) {
      console.log(`Could not get a new token with the refresh_token upon signing into the app, or could not update the user with that token ${err}`)
      return false
	}
}

const axiosInstanceCall = async (token) => {
  try {
    const axiosInstance = axios.create()
    const res = await axiosInstance.post(`${BASE_URL}/refresh`, {refresh_token: token.refresh_token} )
    console.log(`A new refresh token was succesfully retrieved`)
    return res.data.token
  } catch (err) {
      console.log(`The refresh token must have expired, signing the user out`)
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
        const storedToken = store.getState().auth
        const expired = Date.now() > storedToken.expires_on
          if (expired) {
            const newToken = await axiosInstanceCall(token)
            if ( newToken ) {
              config.headers.common.authorization = `Bearer ${newToken.access_token}`
              const expirationDelay = Date.now() + ((newToken.expires_in - 15) * 1000)
              newToken.expires_on = expirationDelay
              store.dispatch({type: TOKEN, token: newToken})
            }
          } else {
              config.headers.common.authorization = `Bearer ${storedToken.access_token}`
              return config
          }
      }
      return config
  } catch (err) {

  }
}, error => Promise.reject(error))

export default ( state = {}, action ) => {
  switch(action.type) {
    case TOKEN:
      return action.token
    case LOGOUT:
      return {}
    default:
      return state;
  }
}
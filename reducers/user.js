import axios from 'axios';
import { 
  Alert,
} from 'react-native'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_USER = 'USER'

const BASE_URL = 'https://app.gome.fit'
const CLIENT_ID = '9'
const CLIENT_SECRET = 'D4ZcfUvr9loPYYu9b4zIxwCuLUFagtMTCU6coLS7'
const TOKEN = 'token'
// const USER = 'user'

export const register = (name, email, password, passwordConfirm, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/api/register`, {name: name, username: email, password: password, password_confirmation: passwordConfirm, client_secret: CLIENT_SECRET, client_id: CLIENT_ID} )
      .then( (res) => {
        let token = res.data
        dispatch({type: LOGIN, user: {token}})
        navigation.navigate('Profile')
      })
      .catch( error => {
        console.log({error})
        Alert.alert('Check console log for error')
      })
  }
}

export const login = (email, password, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/oauth/token`, { username: email, password: password, grant_type: 'password', client_id: CLIENT_ID, client_secret: CLIENT_SECRET} )
      .then ( (res) => {
        const token = res.data
        dispatch({type: LOGIN, user: {token}})
        navigation.navigate('Profile')
      })
      .catch( err => {
        console.log({err})
        Alert.alert('Wrong username or password, please try again')
      })
  }
}

validateToken = () => {
  return (dispatch, getState) => {
    const {access_token, refresh_token} = getState().token
    axios.get(`${BASE_URL}/oauth/authorize`, {access_token})
    .then( res => {
      //if token valid, return token to use in api request and dispatch new token
    })
    .catch( error => {
      //if invalid, make request using refresh token for a new token
        axios.get(`${BASE_URL}/oauth/token/refresh`, {grant_type: 'refresh_token', refresh_token: refresh_token})
          .then({
            //if successfull, return new access token and new refresh token to use in api request and dispatch token
          })
          .catch ( error => {
            Alert.alert('Session has timed out, please sign in again')
             // return false, log user out and direct user to login page
          })
    })
  }
}

export const logout = () => {
  return ( dispatch ) => {
    dispatch({type: LOGOUT})
    Alert.alert("Logout Successful")
  }
}

export default ( state = {}, action ) => {
  switch(action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    default:
      return state;
  }
}
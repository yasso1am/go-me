import axios from 'axios';
import { Alert, AsyncStorage } from 'react-native'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const TOKEN = 'TOKEN'

const BASE_URL = 'https://app.gome.fit/api'

export const registerFacebook = (fb_access_token) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/register/facebook`, {fb_access_token})
    .then( async res => {
      let user = res.data.user
      let token = res.data.token
      try {
        const tenMinutesFromNow = Date.now() + (token.expires_in * 1000)
        token.expires_on = tenMinutesFromNow
        let tokenToStore = JSON.stringify(token)
          await AsyncStorage.setItem(TOKEN, tokenToStore)
          dispatch({type: LOGIN, user})
        } catch (err) {
          console.log(err)
        }
        navigation.navigate('BuildProfile')
    })
    .catch ( err => {
      console.log({err})
      Alert.alert(`Error registering user: ${error.response.data[0]}`)
    })
  }
}

export const register = (name, email, password, passwordConfirm, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/register`, {name: name, username: email, password: password, password_confirmation: passwordConfirm} )
      .then( async (res) => {
        let user = res.data.user
        let token = res.data.token
        try {
          const tenMinutesFromNow = Date.now() + (token.expires_in * 1000)
          token.expires_on = tenMinutesFromNow
            dispatch({type: TOKEN, token})
            dispatch({type: LOGIN, user})
          } catch (err) {
            console.log(err)
          }
          navigation.navigate('BuildProfile')
      })
      .catch( error => {
        console.log({error})
        Alert.alert(`Error registering user: ${error.response.data[0]}`)
      })
  }
}

export const login = (email, password, navigation) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/login`, { username: email, password: password} )
      .then ( async (res) => {
        const user = res.data.user
        let token = res.data.token
        try {
          const tenMinutesFromNow = Date.now() + (token.expires_in * 1000)
          token.expires_on = tenMinutesFromNow
            dispatch({type: TOKEN, token})
            dispatch({type: LOGIN, user})
          } catch (err) {
            console.log(err)
          }
          if (!user.avatar){
            navigation.navigate('BuildProfile')
          } else {
            navigation.navigate('Profile')
          }
      })
      .catch( err => {
        console.log({err})
        Alert.alert('Wrong username or password, please try again')
      })
  }
}

export const updateProfile = (profile) => {
  return ( dispatch, getState ) => {
    const { id } =  getState().user
    axios.put(`${BASE_URL}/v1/user/${id}`, profile)
    .then( res => {
      dispatch({type: LOGIN, user: res.data.user})
    })
    .catch( err => {
      Alert.alert('Something went wrong updating your profile, please try again later')
      console.log({err})
    })
  }
}


export const getProfile = () => {
  return (dispatch, getState) => {
    const { id } = getState().user
      axios.get(`${BASE_URL}/v1/user/${id}`)
      .then( (res) => {
        dispatch({type: LOGIN, user: res.data})
        return res.data
        console.log('Successfully retrieved profile, and dispatched Login')
      })
      .catch( err => {
        return false
        console.log('The catch of getProfile() has been hit, so the function failed')
      })
  }
}

export const logout = (navigation) => {
  return async ( dispatch, getState ) => {
    const { id } = getState().user

    await dispatch({type: LOGOUT})
    Alert.alert("Logout Successful")
      await AsyncStorage.removeItem(TOKEN)
    navigation.navigate('AuthHome')
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
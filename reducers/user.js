import axios from 'axios';
import { 
  Alert,
  AsyncStorage,
} from 'react-native'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_USER = 'USER'

const BASE_URL = 'https://app.gome.fit'
const CLIENT_ID = '9'
const CLIENT_SECRET = 'D4ZcfUvr9loPYYu9b4zIxwCuLUFagtMTCU6coLS7'
const TOKEN = 'token'
// const USER = 'user'

// export const register = (name, email, password, passwordConfirm) => {
//   return (dispatch) => {
//     axios.post(`${BASE_URL}/register`, {name, username: email, password, passwordConfirm, CLIENT_SECRET, CLIENT_ID} )
//       .then( async (res) => {
//           try {
//             let pastUser = checkLocalToken()
//               if (response !== false) {
//                 let keys = [TOKEN, USER]
//                 AsyncStorage.multiRemove(keys)
//               }
//               const user = res.data.user
//               const token = res.data.token
//             await AsyncStorage.setItem(TOKEN, token)
//             await AsyncStorage.setItem(USER, user)
//             dispatch({ type: LOGIN, user: {user, token} })
//           } catch (error) {
//             console.log('Error setting the item')
//           }
//       })
//       .catch( error => {
//         console.log({error})
//         Alert.alert('Check console log for error')
//       })
//   }
// }

// const checkLocalToken = async () => {
//   try {
//     const token = await AsyncStorage.getItem(TOKEN)
//     const user = await AsyncStorage.getItem(USER)
//       return token, user
//   } catch {
//     return false
//   }
// }

const setToken = async (token) => {
  try {
    const storedToken = await AsyncStorage.getItem(TOKEN)
      if (storedToken !== null){ 
        await AsyncStorage.removeItem(TOKEN) 
      }
        await AsyncStorage.setItem(TOKEN, JSON.stringify(token))
          return true
  } catch (error) {
    console.log('Unable to set token')
      return false
  }
}

export const login = (email, password) => {
  return (dispatch) => {
    axios.post(`${BASE_URL}/oauth/token`, { username: email, password: password, grant_type: 'password', client_id: CLIENT_ID, client_secret: CLIENT_SECRET} )
      .then ( (res) => {
        const token = res.data
        let status = setToken(token)
        if (status){
          dispatch({type: LOGIN, user: {token}})
        }
      })
      .catch( err => {
        debugger
        console.log({err})
      })
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
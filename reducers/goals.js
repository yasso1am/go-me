import axios from 'axios';
import { Alert } from 'react-native'

const BASE_URL = 'https://app.gome.fit/api'

const GET_GOALS = "GET_GOALS"


export const getGoals = () => {
  return(dispatch) => {
  }
}


export default ( state = {}, action ) => {
  switch(action.type) {
    case GET_GOALS:
      return action.goals
    default:
      return state;
  }
  }

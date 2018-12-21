import axios from 'axios';
import { Alert } from 'react-native'

const BASE_URL = 'https://app.gome.fit/api'

const POST_WORKOUT = 'POST_WORKOUT'
const ADD_WORKOUT = 'ADD_WORKOUT'
const ADD_GOAL = 'ADD_GOAL'

export const addWorkout = (workout) => {
  return(dispatch) => {
      dispatch({type: ADD_WORKOUT, workout})
  }
}

export const addGoal = (goal) => {
  return(dispatch) => {
    dispatch({type: ADD_GOAL, goal: goal})
  }
}

export const postWorkout = () => {
  return (dispatch, getState) => {
    const workout = getState().workout
      axios.post(`${BASE_URL}/v1/workout`, workout)
        .then( res => {
          console.log({res})
        })
        .catch ( err => {
          console.log({err})
        })
  }
}


export default ( state = {}, action ) => {
  switch(action.type) {
    case ADD_WORKOUT:
      return action.workout
    case ADD_GOAL:
      return {
        ...state,
        goal: action.goal
      }

    default:
      return state;
  }
  }

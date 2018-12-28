import axios from 'axios';
import { Alert } from 'react-native'

const BASE_URL = 'https://app.gome.fit/api'

const POST_WORKOUT = 'POST_WORKOUT'
const ADD_WORKOUT = 'ADD_WORKOUT'
const ADD_GOAL = 'ADD_GOAL'
const CLEAR_WORKOUT = 'CLEAR_WORKOUT'

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

export const postWorkout = (navigation) => {
  return (dispatch, getState) => {
    const base = getState().workout
    let workout = {
      date: base.date,
      distance: base.distance,
      type: base.type,
      calories_burned: base.calories_burned,
      duration: base.duration,
      goal_id: base.goal.id
    }
      axios.post(`${BASE_URL}/v1/workout`, workout)
        .then( res => {
          Alert.alert(
            'Workout Posted!',
            'Succesfully logged your workout',
            [
              { text: 'Ok', onPress: () => navigation.navigate('Profile')}
            ]
          )
        })
        .catch ( err => {
          Alert.alert(
            'Post Failed!',
            'Something went wrong while trying to post your workout, please try again',
            [
              { text: 'Ok', onPress: () => navigation.navigate('Profile')}
            ]
          )
        })
  }
}

export const clearWorkout = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_WORKOUT})
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
    case CLEAR_WORKOUT:
      return {}
    default:
      return state;
  }
  }

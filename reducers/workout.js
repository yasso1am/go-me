import axios from 'axios';
import { Alert } from 'react-native'

const BASE_URL = 'https://app.gome.fit/api'

const POST_WORKOUT = 'POST_WORKOUT'

export const postWorkout = (workout, goal_id) => {
  return (dispatch) => {
    const workoutGoal = {
      distance: workout.distanceNumber,
      date: workout.formattedDate, 
      type: workout.workoutType, 
      goal_id: goal_id, 
      calories_burned: workout.caloriesNumber, 
      duration: workout.durationNumber
    }
      axios.post(`${BASE_URL}/v1/workout`, workoutGoal)
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
    case POST_WORKOUT:
      return action.workout
    default:
      return state;
  }
}
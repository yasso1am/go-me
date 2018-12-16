// __tests__/Login-page-test.js
import reducer from '../reducers/user'


const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"
const user = { name: 'Andrew', user_id: 1 }

describe('user reducer', () => {
  it('initially returns empty', () => {
    expect(reducer(undefined, {})).toEqual(
      {}
    )
  })

  it('should handle login', () => {
    expect(reducer({}, { 
      type: LOGIN, 
      user
    })
  ).toEqual(
      user
      )
  })
  
  it('should handle logout', () => {
    expect(reducer({}, {
      type: LOGOUT,
      user
    })
  ).toEqual(
    {}
    )
  })

})
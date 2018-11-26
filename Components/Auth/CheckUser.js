import React from 'react'
import { connect } from 'react-redux'

import { validateToken } from '../../reducers/auth'

class CheckUser extends React.Component{
  async componentDidMount() {
    const { user, isLoaded } = this.props
    validToken = await validateToken()
    if (user && validToken === true){
      console.log('token validation complete')
      const response = {
        result: true,
        user: user
      }
      isLoaded(response)
    } else {
        const response = {
          result: false
        }
      isLoaded(response)
    }
  }

  render(){
    return(
      null
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CheckUser)
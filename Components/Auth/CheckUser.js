import React from 'react'
import { connect } from 'react-redux'


class CheckUser extends React.Component{

  componentDidMount() {
    const { token, isLoaded } = this.props
    if ( token!== undefined){
      const response = {
        result: true,
        token: token
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
  return state.user
}

export default connect(mapStateToProps)(CheckUser)
import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';

export default class admin extends Component {
  
  render() {
    const user = memoryUtils.user;
    if(!user || !user.id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <div>
        Hello {user.username} !
      </div>
    )
  }
}

import React, { Component } from 'react'
import loading_light from './Images/ball_light.gif';
import loading_dark from './Images/ball_dark.gif'
export class Loading extends Component {
  render() {
    let {mode} = this.props;
    console.log(mode)
    return (
      <div className='text-center'>
        <img src={mode === 'light' ? loading_light : loading_dark} alt="loading.gif" />
      </div>
    )
  }
}

export default Loading

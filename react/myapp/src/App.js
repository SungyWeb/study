import React, { Component } from 'react';
import { Button, message } from 'antd';

export default class App extends Component {
  success = () => {
    message.success('haha');
  }

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.success}>App</Button>
      </div>
    )
  }
}

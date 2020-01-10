import React from 'react';

type IProps = {
  msg: string
}
type IState = {
  count: number
}

export class ClaComp extends React.Component<IProps, IState> {
  // 不需要readyonly React.Component已经指定
  state: IState = {
    count: 10
  }
  
  render() {
    return (
      <h3 onClick={() => this.increment(2)}>{this.props.msg}----{this.state.count}</h3>
    )
  }
  increment(amt: number) {
    this.setState(state => ({count: state.count + amt}));
  }
}

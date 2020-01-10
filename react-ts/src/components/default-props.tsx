import React from 'react';

// 函数组件
type Props = { age: number } & typeof defaultProps;
const defaultProps = {
  who: "Johny Five"
};

const GreetFn = (props: Props) => {
  return (
    <h3>{props.who} is {props.age} years old!</h3>
  )
};
GreetFn.defaultProps = defaultProps;



// 类组件
type GreetProps = typeof GreetFn.defaultProps & {
  age: number;
  name: string
};

class GreetCla extends React.Component<GreetProps> {
  static defaultProps = {
    name: "world"
  };
  render() {
    return (
      <h3>{this.props.who} is {this.props.age} years old!</h3>
    )
  }
}
// https://www.cnblogs.com/Wayou/p/react_typescript_default_props.html


export {GreetFn, GreetCla};
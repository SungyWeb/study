import React from "react";

type IProps = { msg: string };  // 也可以用interface

// export const Comp: React.FC<IProps> = ({msg}) => (<div>{msg}</div>);
export const Comp = ({msg}: IProps) => (<div>{msg}</div>);

// 函数组件还有一个隐式的children参数
export const Title: React.FunctionComponent<{title: string}> = ({title, children}) => {
  return (
    <h3 title={title}>{children}</h3>
  )
}

// 1. 函数组件必须返回一个jsx表达式 或者 null 如下不可取
/*
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
*/
/*
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
*/
// 2. 如果你确实想要返回一个其他的类型，那么就要使用断言
export const MyArrayComponent = () => (Array(5).fill(<div />) as any) as JSX.Element;
















// 这里遇到一个坑，Array(5)得到的数组是每个项都为empty的长度为5的数组，不能直接调用map，必须先fill
// export const MyArrayComponent = () => {
//   const el = (Array(5).fill(null).map((item, idx) => {
//     console.log(item, idx)
//     return (<div key={'idx'+idx}>{idx}</div>)
//   }) as any) as JSX.Element;
//   console.log(el);
//   return el;
// }

import React from 'react';

// Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
type Flag = boolean;
export const StateHook = () => {
  const [val, toggle] = React.useState<Flag>(false);
  let txt = val.toString();
  return (
    <h2 onClick={() => toggle(!val)}>
      {txt}
    </h2>
  )
}

export const RefHook = () => {
  
  // const InputEl = React.useRef<HTMLInputElement>(null!);
  const InputEl = React.useRef<HTMLInputElement | null>(null);
  const [f, toggle] = React.useState<boolean>(true);
  const aStyle = {
    border: '1px solid red'
  };
  const bStyle = {
    border: '1px solid blue'
  };
  const clicked = () => {
    if(InputEl && InputEl.current){
      toggle(!f);
      console.log(f);
      InputEl.current.focus();
    }
  }
  let ipt: any = null;
  if(f) {
    ipt = <input id="a" style={aStyle} type="text" ref={InputEl}/>
  }else {
    ipt = <input id="b" style={bStyle} type="text" ref={InputEl}/>
  } 
  return (
    <div onClick={clicked}>
      <span>please input:</span>
      {
        ipt
      }
      
    </div>
  );

  // todo: 两种方式的区别
  /*
  const ref1 = useRef<HTMLElement>(null!);
  const ref2 = useRef<HTMLElement | null>(null);

  The first option will make ref1.current read-only, and is intended to be passed in to built-in ref attributes that React will manage (because React handles setting the current value for you).

  The second option will make ref2.current mutable, and is intended for "instance variables" that you manage yourself.
  */
}


export const EffectHook = () => {
  // Similar to componentDidMount and componentDidUpdate:
  let [count, updateCount] = React.useState(0);
  React.useEffect(() => {
    console.log('update');
  });
  const btnclick = () => updateCount(count++);
  return (
    <div>
      <button onClick={btnclick}>click to update times!</button>
      <p>you clicked the button {count} times!</p>
    </div>
  )
}
import React from 'react';
// import logo from './logo.svg';
import {Comp as Comp1, Title, MyArrayComponent} from './components/function-comp';
import {StateHook, RefHook, EffectHook} from './components/hooks';
import {ClaComp} from './components/class-comp';
import {GreetFn, GreetCla} from './components/default-props';
import './App.css';

const App: React.FC = () => {
  const span = <span>title children</span>
  return (
    <div className="App">
      <div className="box">
        <h1>Function component</h1>
        <Comp1 msg={'哈哈哈'} />
        <Title title={'我是title'} children={span}/>
        <MyArrayComponent />
      </div>
      <div className="box">
        <StateHook />
        <RefHook />
        <EffectHook />
      </div>
      <div className="box">
        <ClaComp msg="class component"/>
      </div>
      <div className="box">
        <GreetFn age={2}/>
        <GreetCla age={22} who="sun"/>
      </div>
    </div>
  );
}

export default App;

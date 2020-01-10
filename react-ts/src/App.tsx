import React from 'react';
// import logo from './logo.svg';
import {Comp as Comp1, Title, MyArrayComponent} from './components/function-comp';
import {StateHook, RefHook, EffectHook} from './components/hooks';
import {ClaComp} from './components/class-comp';
import {GreetFn, GreetCla} from './components/default-props';
import './App.css';

type Item = {
  id: number,
  msg: string
};
type IProps = {
  list: Item[]
};

const List: React.FC<IProps> = (props: IProps) => {

  const clicked = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, item: Item) => {
    e.persist();
    let li = e.target as HTMLLIElement;
    console.log(li.innerText);
    alert(item.id)
  }
  return (
    <ul>
      {
        props.list.map(item => (
          <li key={item.id} onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => clicked(e, item)}>{item.msg}</li>
        ))
      }
    </ul>
  )
}

const App: React.FC = () => {
  const span = <span>title children</span>
  const list = [
    {id: 1, msg: 'a'},
    {id: 2, msg: 'b'},
    {id: 3, msg: 'c'},
  ]
  return (
    <div className="App">
      <List list={list}/>
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

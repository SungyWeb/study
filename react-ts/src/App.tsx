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
      <div className="box">
        <h1>click event</h1>
        <List list={list}/>
      </div>
      <div className="box">
        <h1>Function component</h1>
        <Comp1 msg={'哈哈哈'} />
        <Title title={'我是title'} children={span}/>
        <MyArrayComponent />
      </div>
      <div className="box">
        <h1>Hooks</h1>
        <StateHook />
        <RefHook />
        <EffectHook />
      </div>
      <div className="box">
        <h1>class component</h1>
        <ClaComp msg="class component"/>
      </div>
      <div className="box">
        <h1>default-props</h1>
        <GreetFn age={2}/>
        <GreetCla age={22} who="sun"/>
        <p>always use 'interface' for public API's definition when authoring a library or 3rd party ambient type definitions.</p>
        <p>consider using 'type' for your React Component Props and State, because it is more constrained.</p>
        <h2>Basic Prop Types Examples</h2>
        <p>更多react-ts  prop-types 实例 参考 https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#basic-prop-types-examples 和 https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#useful-react-prop-type-examples </p>
        <p>JSX.Element -> Return value of React.createElement</p>
        <p>React.ReactNode -> Return value of a component</p>
      </div>
    </div>
  );
}

export default App;

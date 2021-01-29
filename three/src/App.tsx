import React, { useEffect, useRef } from 'react';
import './App.css';
import three from './three'
function App() {
  const ref = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    three.render(ref.current)
  }, [])
  return (
    <div ref={ref}></div>
  );
}

export default App;

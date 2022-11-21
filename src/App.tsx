import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { AddedTask } from "./components/addedTask"
import { InputTask } from './components/inputTask';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <InputTask />
        <AddedTask />
      </div>
    </RecoilRoot>
  );
}

export default App;

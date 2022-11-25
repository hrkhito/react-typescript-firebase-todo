import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { AddedTask } from "./components/addedTask"
import { DoneTask } from './components/doneTask';
import { InputTask } from './components/inputTask';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <InputTask />
        <AddedTask />
        <DoneTask />
      </div>
    </RecoilRoot>
  );
}

export default App;

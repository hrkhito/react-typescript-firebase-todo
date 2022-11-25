import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { UndoneTask } from "./components/undoneTask"
import { DoneTask } from './components/doneTask';
import { InputTask } from './components/inputTask';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <InputTask />
        <UndoneTask />
        <DoneTask />
      </div>
    </RecoilRoot>
  );
}

export default App;

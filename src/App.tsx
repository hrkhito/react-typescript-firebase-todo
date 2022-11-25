import React from 'react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { InputTask } from './components/inputTask';
import { ChangePage } from './components/changePage';


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <InputTask />
        <ChangePage />
      </div>
    </RecoilRoot>
  );
}

export default App;

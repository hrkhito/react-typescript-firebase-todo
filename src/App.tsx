import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { InputTask } from './components/inputTask';
import { ChangePage } from './components/changePage';
import theme from './theme/theme';

function App() {

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <InputTask />
        <ChangePage />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;

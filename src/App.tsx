import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import './App.css';
import { InputTask } from './components/inputTask';
import { ChangePage } from './components/changePage';
import theme from './theme/theme';
// import { auth, provider } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { signInWithPopup, signOut } from 'firebase/auth';


function App() {

  // const [user]=useAuthState(auth);

  // const signIn=()=>{
  //   signInWithPopup(auth,provider)
  //   .catch((err)=>{
  //     alert(err.message);
  //   })
  // }

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

import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Page404 } from "./components/page404";
import { fireauth } from "./firebase";
import { Login } from "./pages/Login";
import { TodoPage } from "./pages/Todo";
import { authState } from "./store/AuthState";
import { Spinner,Flex } from '@chakra-ui/react';

type Props={
  element: React.ReactNode;
};

// Login用画面を表示するためのRouter 既にユーザーが存在していたらtodoページへリダイレクト
const LoginRoute=(props:Props)=>{

  const { element }=props;

  const auth=useRecoilValue(authState);

  if(auth){
    return (
      <>
        <Navigate to="/todo" replace={false} />
      </>
    )
  } else {
    return <>{element}</>
  };
};

// todoページを表示するためのRouter ログインしていなかったらログインページへリダイレクト

const TodoRoute=(props:Props)=>{
  const { element }=props;

  const auth=useRecoilValue(authState);

  if(auth){
    return <>{element}</>
  } else {
    return (
      <>
        <Navigate to="/" replace={false} />
      </>
    )
  }
}

function App() {

  const setAuth=useSetRecoilState(authState);

  const [isLoading,setIsLoading]=useState<boolean>(true);

  // マウント時にonAuthStateChangedを用意
  useEffect(()=>{
    onAuthStateChanged(fireauth,async (user)=>{
      if(user){
        const tempUser={
          id: user.uid,
          name: user?.displayName,
          email: user?.email,
        };

        setAuth(tempUser);
        alert("ログイン成功");
      }
      setIsLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setAuth]);

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Flex alignItems="center" mr="auto" ml="auto" mt="64" flexDirection="column" width="100%">
            <Spinner></Spinner>
          </Flex>
        ) : (
          <Routes>
            <Route path="/" element={<LoginRoute element={<Login />} />} />
            <Route path="/todo" element={<TodoRoute element={<TodoPage />} />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
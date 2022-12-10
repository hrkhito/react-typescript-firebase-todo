import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { fireauth } from "../firebase";
import { AuthState, authState } from "../store/AuthState";
import { Button,Flex,Text } from '@chakra-ui/react';

export const Login=()=>{

  // ユーザー情報を変更する
  const setAuth: SetterOrUpdater<AuthState>=useSetRecoilState(authState);

  const navigate=useNavigate();

  const provider=new GoogleAuthProvider();

  // ログイン用関数
  const onClickLogin=async()=>{
    try {
      await signInWithPopup(fireauth,provider).then((res)=>{
        if(res) {
          const tempUser={
            id: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };
          setAuth(tempUser);
          navigate("/todo");
        }
      });
    } catch {
      alert("ログインに失敗しました");
    }
  }

  return (
    <Flex alignItems="center" mr="auto" ml="auto" mt="64" flexDirection="column" width="100%">
      <Text mb="8" fontSize="xl" color="purple" fontWeight="bold" as="h1">始めるにはログインしてください</Text>
      <Button fontSize="xl" onClick={onClickLogin}>ログイン</Button>
    </Flex>
  )
};
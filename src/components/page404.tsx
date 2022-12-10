import React from 'react'
import { Flex,Box,Button } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { authState } from '../store/AuthState'
import { useNavigate } from 'react-router-dom'



export const Page404 = () => {

  const auth=useRecoilValue(authState);

  const navigate=useNavigate();

  // ログインしていたらtodoページへリダイレクト ログインしていなかったらログインページへリダイレクト
  const onClickBack=()=>{
    if(auth){
      navigate("/todo")
    } else {
      navigate("/")
    }
  }

  return (
    <Flex alignItems="center" mr="auto" ml="auto" mt="64" flexDirection="column" width="100%">
      <Box mb="4" fontSize="xl">page404</Box>
      <Button onClick={onClickBack}>戻る</Button>
    </Flex>
  )
}

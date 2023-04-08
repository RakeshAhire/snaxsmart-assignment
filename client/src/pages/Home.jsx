import React, { useEffect, useState } from 'react'
import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Select,
  Center,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [cardNo, setCardNo] = useState("");
  const [machineid, setMachineid] = useState("");
  const [slot, setSlot] = useState("");
  const [machines, setMachine] = useState([]);
  const toast = useToast()
  const fetchMachine = async () => {
    await axios.get('https://odd-red-gopher-cap.cyclic.app/machine')
      .then(res => setMachine(res.data))
      .catch(e => console.log(e))
  }
  useEffect(() => {
    fetchMachine()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`https://odd-red-gopher-cap.cyclic.app/vendreq/${machineid}?card=${cardNo}&slot=${slot}`)
        .then(res => {
          if(res.data.transactionStatus){
            toast({
              title: "Success",
              description: "Choose your Product",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }
          else{
            toast({
              title: "Error",
              description: "Your are unauthrized",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch(e => console.log(e))
    } catch (error) {
      toast({
        title: "Error",
        description: "Card is Invalid",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setCardNo("")
    setMachineid("")
    setSlot("")

  }
  return (
    <Center >
      <Stack p={8} rounded="lg" w="40%" direction="column" mt={20} alignItems="center" boxShadow={"lg"}>
        <Box textAlign="center">
          <Text fontSize="24px" fontWeight="bold" mb="2%">
            Lets Authenticate yourself !
          </Text>
          <Text fontSize="14px" color="#828991">Upload photos of your product or service</Text>
        </Box>

        <form onSubmit={handleSubmit} >
          <Stack w="100%" spacing="10" mt={3}>
            <FormControl mt={5}>
              <Select
                value={machineid}
                onChange={(e) => setMachineid(e.target.value)}
              >
                <option value="">Select Machine</option>
                {machines.map((item, i) => (
                  <option key={item.id} value={item.id}>{item.companyName}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="cardNo">
              <FormLabel>Card Number</FormLabel>
              <Input type="text" background="white" placeholder='XXAABB' value={cardNo} onChange={(event) => setCardNo(event.target.value)} />
            </FormControl>
            <FormControl id="slot">
              <FormLabel>Slot Number</FormLabel>
              <Input type="text" background="white" placeholder='AX' value={slot} onChange={(event) => setSlot(event.target.value)} />
            </FormControl>
            <Button
              type='submit'
              fontSize={'md'}
              rounded={5}
              color={'white'}
              bg={'blue.400'}
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.200',
              }}>
              Submit
            </Button>
          </Stack>
        </form>
        <Link to="/login">Admin Login</Link>
      </Stack>
      
    </Center>
  )
}

export default Home

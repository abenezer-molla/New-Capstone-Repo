import React from 'react';
import { Box, InputGroup, Input, InputRightElement, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box h="calc(130vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Login Page
          </Text>
          <Divider borderColor="red" />
          <br />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
          <Input mt={3} mb={3} placeholder="write doctor's first name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Last Name</Text>
          <Input mt={3} mb={3} placeholder="write doctor's last name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's ID </Text>
          <br />
          <HStack>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Password</Text>
          <br />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <br />
          <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Department the Doctor is Working Under</Text>
          <br />
          <Button mt={7} w="100%" colorScheme="blue">
            SUBMIT
          </Button>
          <br />
          <br />
          <br />
          <Divider borderColor="red" />
          <Divider borderColor="red" />
          <HStack>
            <Text fontSize="xl" mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>ARE YOU A NEW USER?</Text>
            <NavLink
              to="/signup"
              key="signup"
            >
              <Button mt={4} w="100%" colorScheme="blue">
                SIGN UP
              </Button>
            </NavLink>
          </HStack>
          <br />
          <Divider borderColor="red" />
          <Divider borderColor="red" />
        </Box>
      </Center>
    </Box>
  );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, InputGroup } from 'react-bootstrap';
import { Box, InputRightElement, Input, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../auth';

export default function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const navigate = useNavigate();
  const userLogin = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('/auth/login', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          login(data.access_token);
          navigate('/HomePage');
        } else {
          alert('Invalid username or password');
        }
      });
    reset();
  };
  return (
    <Box h="calc(80vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Login Page
          </Text>
          <Divider borderColor="red" />
          <br />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Username</Text>
          <Form.Group id="username">
            <Input
              type="username"
              name="username"
              {...register('username', { required: true })}
              required
              mt={3}
              mb={3}
              placeholder="enter your username"
            />
          </Form.Group>
          <br />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Password</Text>
          <br />

          <Form.Group id="password">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                name="password"
                {...register('password', { required: true })}
                required
              />
            </InputGroup>
          </Form.Group>

          <br />
          <Form.Group>
            <Button onClick={handleSubmit(userLogin)} mt={7} w="100%" colorScheme="blue">
              SUBMIT
            </Button>
          </Form.Group>
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

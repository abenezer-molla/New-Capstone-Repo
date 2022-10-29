import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { Box, InputGroup, Input, InputRightElement, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

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
        console.log(data.access_token);

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
    <Box h="calc(130vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Login Page
          </Text>
          <Divider borderColor="red" />
          <br />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
          <Form.Group id="firstname">
            <Input
              mt={3}
              mb={3}
              placeholder="write doctor's first name"
              name="firstname"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('firstname', { required: true })}
            />
          </Form.Group>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Last Name</Text>
          <Form.Group id="lastname">
            <Input
              mt={3}
              mb={3}
              placeholder="write doctor's last name"
              name="lastname"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('lastname', { required: true })}
            />
          </Form.Group>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's ID </Text>
          <br />
          <Form.Group id="pininput">
            <HStack>
              <PinInput
                name="pininput"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('pininput', { required: true })}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Form.Group>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Password</Text>
          <br />
          <Form.Group id="password">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                name="password"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password', { required: true })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Form.Group>
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
              <Button onClick={handleSubmit(userLogin)} mt={4} w="100%" colorScheme="blue">
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

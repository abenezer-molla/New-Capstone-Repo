import React, { useState, useEffect } from 'react';
import { Box, InputGroup, InputRightElement, Input, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line no-lone-blocks
{ /* import { DatePicker } from 'chakra-ui-date-input'; */ }

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverResponse, setServerResponse] = useState('');

  const [message, setMessage] = useState('');

  const submitForm = (data) => {
    console.log(data);
    if (data.password === data.confirmpassword) {
      const body = {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        email: data.email,
        address: data.address,
        password: data.password,
        level: data.level,
        gender: data.gender,
        age: data.age,
        department: data.department,

      };

      console.log(watch('username'));

      const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      fetch('/auth/doctors', requestOptions)
        .then((res) => res.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          setServerResponse(data.message);
          setShow(true);
        })
        .catch((err) => console.log(err));

      reset();
    } else {
      alert('Passwords do not match');
    }
  };
  return (
    <>
      <Alert
        variant="success"
        onClose={() => {
          setShow(false);
        }}
        dismissible
      >
        <p>
          {serverResponse}
        </p>
      </Alert>
      <Box h="calc(200vh)" w="100%">
        <div>
          <h1>{message}</h1>
        </div>
        <form>
          <Center w="50%" h="100%">
            <Box w="70%">
              <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
                Sign Up Page
              </Text>
              <Divider borderColor="red" />
              <br />

              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
              <Form.Group id="firstname">
                <Input
                  type="firstname"
                  name="firstname"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('firstname', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="write doctor's first name"
                />
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Last Name</Text>
              <Form.Group id="lastname">
                <Input
                  type="lastname"
                  name="lastname"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('lastname', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="write doctor's last name"
                />
              </Form.Group>
              <br />
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Username</Text>
              <Form.Group id="username">
                <Input
                  type="username"
                  name="username"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('username', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="write doctor's username"
                />
                {errors.username && <small style={{ color: 'red' }}>Username is required</small>}
              </Form.Group>
              <br />
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Email</Text>
              <Form.Group id="email">
                <Input
                  type="email"
                  name="email"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('email', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="write doctor's email"
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

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Form.Group>
              <br />
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Confirm Password</Text>
              <br />
              <Form.Group id="confirmpassword">
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    {...register('confirmpassword', { required: true })}
                    required
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Form.Group>
              <br />
              <Text style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Address</Text>
              <Form.Group id="address">
                <Input
                  type="address"
                  name="address"
                  {...register('address', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="street adress, city, country"
                />
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Level</Text>
              <br/>
              <Form.Group id="level">
                <Form.Select {...register('level', { required: true })} id="level">
                  <option>Select Level</option>
                  <option value="Resident">Resident</option>
                  <option value="Fellow">Fellow</option>
                  <option value="Attending physician">Attending physician</option>
                  <option value="Assistant professor">Assistant professor</option>
                  <option value="Associate professor">Associate professor</option>
                  <option value="Professor">Professor</option>
                  <option value="Department chair">Department chair</option>
                </Form.Select>
              </Form.Group>
              <br/>
              <br/>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Gender</Text>
              <br/>
              <Form.Group id="gender">
                <Form.Select {...register('gender', { required: false })} id="gender">
                  <option>Select Gender</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                </Form.Select>
              </Form.Group>
              <br/>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Age </Text>
              <Form.Group id="age">
                <NumberInput
                  defaultValue={0}
                  min={0}
                  max={150}
                  type="age"
                  name="age"
                  {...register('age', { required: true })}
                  // required
                  mt={3}
                  mb={3}
                  placeholder="enter patient's age"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Form.Group>
              <br/>
              <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Department the Doctor is Working Under</Text>
              <br/>
              <Form.Group id="department">
                <Form.Select {...register('department', { required: true })} id="department">
                  <option>Select Department</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Chronic Illness">Chronic Illness</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Infectious Diseases">Infectious Diseases</option>
                  <option value="FEMCancerALE">Cancer</option>
                  <option value="Obstetrics and Gyne">Obstetrics and Gyne</option>
                  <option value="Emegency">Emegency</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Button onClick={handleSubmit(submitForm)} mt={7} w="100%" colorScheme="blue">
                  SUBMIT
                </Button>
              </Form.Group>
              <br />
              <br />
              <br />
              <Divider borderColor="red" />
              <Divider borderColor="red" />
              <HStack>
                <Text fontSize="xl" mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Already Have An Account?</Text>
                <NavLink
                  to="/login"
                  key="login"
                >
                  <Button mt={4} w="100%" colorScheme="blue">
                    LOGIN
                  </Button>
                </NavLink>
              </HStack>
              <br />
              <Divider borderColor="red" />
              <Divider borderColor="red" />
            </Box>
          </Center>
        </form>
      </Box>
    </>
  );
}

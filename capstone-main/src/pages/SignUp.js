import React, { useState } from 'react';
import { Box, InputGroup, InputRightElement, Input, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';
import { Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverResponse, setServerResponse] = useState('');

  const submitForm = (data) => {
    if (data.password === data.confirmpassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      fetch('/auth/signup', requestOptions)
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
        <Form>
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
                    // eslint-disable-next-line react/jsx-props-no-spreading
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('address', { required: true })}
                  required
                  mt={3}
                  mb={3}
                  placeholder="street adress, city, country"
                />
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Level</Text>
              <Form.Group id="status">
                <Select
                  placeholder="Select Status"
                  mt={3}
                  name="status"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('status', { required: true })}
                  required
                >
                  <option value="option3">Resident</option>
                  <option value="option1">Chief resident</option>
                  <option value="option1">Fellow</option>
                  <option value="option1">Attending physician</option>
                  <option value="option1">Department head</option>
                  <option value="option1">Medical director</option>
                </Select>
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Gender</Text>
              <Form.Group id="status">
                <Select
                  placeholder="Select Gender"
                  mt={3}
                  name="status"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('status', { required: true })}
                  required
                >
                  <option value="option3">Male</option>
                  <option value="option1">Female</option>
                  <option value="option2">Other</option>

                </Select>
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Age </Text>
              <br />
              <Form.Group id="age">
                <NumberInput
                  defaultValue={0}
                  min={0}
                  clampValueOnBlur={false}
                  name="age"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('age', { required: true })}
                  required
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Form.Group>
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's ID </Text>
              <br />
              <Form.Group id="age">
                <HStack>
                  <PinInput
                    name="pininput"
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...register('pininput', { required: true })}
                    required
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
              <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Hire Date </Text>
              <br />
              <Form.Group id="datepicker">
                <DatePicker
                  placeholder="pick a date"
                  position="relative"
                  name="datepicker"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('datepicker', { required: true })}
                />
              </Form.Group>
              <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Department the Doctor is Working Under</Text>
              <br />
              <Form.Group id="department">
                <FormControl
                  as={SimpleGrid}
                  columns={{ base: 2, lg: 2 }}
                  name="department"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('department', { required: true })} 
                >
                  <FormLabel htmlFor="isChecked">Emergency</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isDisabled">Pediatric</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isFocusable">Chronic Illness</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isInvalid">Internal Medicine</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isReadOnly">Obstetrics and Gynecology</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isRequired">Infectious Deseases</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isRequired">Surgery</FormLabel>
                  <Switch id="isRequired" isRequired />

                  <FormLabel htmlFor="isRequired">Cancer</FormLabel>
                  <Switch id="isRequired" isRequired />
                </FormControl>
              </Form.Group>
              <Button onClick={handleSubmit(submitForm)} mt={7} w="100%" colorScheme="blue">
                SUBMIT
              </Button>
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
        </Form>
      </Box>
    </>
  );
}

import React from 'react';
import { Box, InputGroup, InputRightElement, Input, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box h="calc(200vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Sign Up Page
          </Text>
          <Divider borderColor="red" />
          <br />

          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
          <Input mt={3} mb={3} placeholder="write doctor's first name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Last Name</Text>
          <Input mt={3} mb={3} placeholder="write doctor's last name" />
          <br />
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
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Confirm Password</Text>
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
          <Text style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Address</Text>
          <Input mt={3} placeholder="street adress, city, country" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Level</Text>
          <Select placeholder="Select Status" mt={3}>
            <option value="option3">Resident</option>
            <option value="option1">Chief resident</option>
            <option value="option1">Fellow</option>
            <option value="option1">Attending physician</option>
            <option value="option1">Department head</option>
            <option value="option1">Medical director</option>
          </Select>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Gender</Text>
          <Select placeholder="Select Gender" mt={3}>
            <option value="option3">Male</option>
            <option value="option1">Female</option>
            <option value="option2">Other</option>

          </Select>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Age </Text>
          <br />
          <NumberInput defaultValue={0} min={0} clampValueOnBlur={false}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Hire Date </Text>
          <br />
          <DatePicker placeholder="pick a date" position="relative" />
          <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Department the Doctor is Working Under</Text>
          <br />
          <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
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
          <Button mt={7} w="100%" colorScheme="blue">
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
    </Box>
  );
}

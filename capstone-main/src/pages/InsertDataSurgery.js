import React from 'react';
import { Box, Input, Center, Divider, Text, Button, PinInputField, PinInput, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, Textarea, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { DatePicker } from 'chakra-ui-date-input';

export default function InsertDataSurgery() {
  return (
    <Box h="calc(250vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Doctor's Data
          </Text>
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
          <Input mt={3} mb={3} placeholder="write doctor's first name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Doctor's Last Name</Text>
          <Input mt={3} mb={3} placeholder="write doctors's last name" />
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
          <br />
          <br />

          <Divider />
          <Divider />
          <Divider />
          <br />
          <br />

          <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
            Patient's Data
          </Text>
          <br />

          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Patient's First Name</Text>
          <Input mt={3} mb={3} placeholder="write patient's first name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Patient's Last Name</Text>
          <Input mt={3} mb={3} placeholder="write patient's last name" />
          <Text style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Address</Text>
          <Input mt={3} placeholder="street adress, city, country" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Status</Text>
          <Select placeholder="Select Status" mt={3}>
            <option value="option3">Active</option>
            <option value="option1">Passed Away</option>
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
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Patient's ID </Text>
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
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Date </Text>
          <br />
          <DatePicker placeholder="pick a date" position="relative" />
          <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Report to the Selected Department</Text>
          <br />
          <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
            <FormLabel htmlFor="isChecked">Emergency</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isDisabled">Pediatric</FormLabel>
            <Switch id="isRequired" isRequired />

            <FormLabel htmlFor="isFocusable">Chronic Illness</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isInvalid">Internal Medicine</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isReadOnly">Obstetrics and Gynecology</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isRequired">Infectious Deseases</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isRequired">Surgery</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isRequired">Cancer</FormLabel>
            <Switch id="isReadOnly" isReadOnly />
          </FormControl>

          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Detailed Medical Note about the Patient</Text>
          <br />
          <Textarea placeholder="Write a detailed medical note about the patient. You can use the editor to compose your note and paste it here once done." />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Diagnosis and/or Medical Note Status</Text>
          <Select placeholder="Select Status" mt={3}>
            <option value="option3">Complete</option>
            <option value="option1">Pending</option>
          </Select>
          <Button mt={7} w="100%" colorScheme="blue">
            SUBMIT
          </Button>
          <br />
        </Box>
      </Center>
    </Box>
  );
}

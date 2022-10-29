import React from 'react';
import { Box, Input, Center, Text, Button, PinInputField, PinInput, Stack, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, Textarea, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';

export default function InsertDataSurgery() {
  return (
    <Box h="calc(190vh)" w="100%">
      <Center w="50%" h="100%">
        <Box w="70%">
          <Text fontSize="100xl" style={{ lineHeight: '160%' }} color="gray.600">
            Tell us more about you.
          </Text>
          <Text mt={3}>
            Tell us about yourself so we can match you with the best person to talk to.
          </Text>
          <br />
          <Text mt={3} fontSize="large" style={{ lineHeight: '110%', fontWeight: 'bolder' }} color="black.900">
            I want to be a...
          </Text>

          <Stack direction="row" align="left" justifyContent="space-between" mt={1}>
            <Button colorScheme="blue" variant="outline" size="lg" width={300}>
              Talker
            </Button>
            <Button colorScheme="green" variant="solid" size="lg" width={300}>
              Listner
            </Button>
          </Stack>
          <br />

          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> First Name</Text>
          <Input mt={3} mb={3} placeholder="write patient's first name" />
          <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Last Name</Text>
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
          <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Report to the Selected Department</Text>
          <br />
          <FormControl as={SimpleGrid} columns={{ base: 2, lg: 2 }}>
            <FormLabel htmlFor="isChecked">Emergency</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isDisabled">Pediatric</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isFocusable">Chronic Illness</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isInvalid">Internal Medicine</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isReadOnly">Obstetrics and Gynecology</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isRequired">Infectious Deseases</FormLabel>
            <Switch id="isReadOnly" isReadOnly />

            <FormLabel htmlFor="isRequired">Surgery</FormLabel>
            <Switch id="isRequired" isRequired />

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

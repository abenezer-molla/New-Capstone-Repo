import React, { useState, useEffect } from 'react';
import { Box, Input, Center, Divider, Text, Button, PinInputField, PinInput, Stack, NumberInput, HStack, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper, Select, Textarea, FormControl, Switch, FormLabel, SimpleGrid } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Form, Alert } from 'react-bootstrap';

export default function InsertDataCancer() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverResponse, setServerResponse] = useState('');

  const submitForm = (data) => {
    console.log(data);
    const body = {
      patientid: data.patientid,
      patientfirstname: data.patientfirstname,
      patientlastname: data.patientlastname,
      address: data.address,
      gender: data.gender,
      medicalnote: data.medicalnote,
      age: data.age,
      department: data.department,
      status: data.status,
      diagnosisstatus: data.diagnosisstatus,
      doctorfirstname: data.doctorfirstname,
      doctorlastname: data.doctorlastname,
      doctorid: data.doctorid,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch('/patients/patients', requestOptions)
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        setServerResponse(data.patientfirstname);
        setShow(true);
      })
      .catch((err) => console.log(err));

    reset();
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
      <Box h="calc(250vh)" w="100%">
        <Center w="50%" h="100%">
          <Box w="70%">
            <Text fontSize="6xl" mt={3} style={{ lineHeight: '200%', fontWeight: 'bolder' }}>
              Doctor's Data
            </Text>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's First Name</Text>
            <Form.Group id="doctorfirstname">
              <Input
                type="doctorfirstname"
                name="doctorfirstname"
                {...register('doctorfirstname', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter doctor's firstname"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's Last Name</Text>
            <Form.Group id="doctorlastname">
              <Input
                type="doctorlastname"
                name="doctorlastname"
                {...register('doctorlastname', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter doctor's lastname"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Doctor's ID </Text>
            <Form.Group id="doctorid">
              <Input
                type="doctorid"
                name="doctorid"
                {...register('doctorid', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter doctor's id"
              />
            </Form.Group>
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
            <Form.Group id="patientfirstname">
              <Input
                type="patientfirstname"
                name="patientfirstname"
                {...register('patientfirstname', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's firstname"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Patient's Last Name</Text>
            <Form.Group id="patientlastname">
              <Input
                type="patientlastname"
                name="patientlastname"
                {...register('patientlastname', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's lastname"
              />
            </Form.Group>
            <Text style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Address</Text>
            <Form.Group id="address">
              <Input
                type="address"
                name="address"
                {...register('address', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's address"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Status</Text>
            <Form.Group id="status">
              <Input
                type="status"
                name="status"
                {...register('status', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's status"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Gender</Text>
            <Form.Group id="gender">
              <Input
                type="gender"
                name="gender"
                {...register('gender', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's gender"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Age </Text>
            <br />
            <Form.Group id="age">
              <Input
                type="age"
                name="age"
                {...register('age', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's age"
              />
            </Form.Group>

            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Patient's ID </Text>
            <br />
            <Form.Group id="patientid">
              <Input
                type="patientid"
                name="patientid"
                {...register('patientid', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's ID"
              />
            </Form.Group>
            <br />
            <Text mt={5} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Report to the Selected Department</Text>
            <br />
            <Form.Group id="department">
              <Input
                type="department"
                name="department"
                {...register('department', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="enter patient's department to be admitted"
              />
            </Form.Group>
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Detailed Medical Note about the Patient</Text>
            <br />
            <Form.Group id="medicalnote">
              <Textarea
                type="medicalnote"
                name="medicalnote"
                {...register('medicalnote', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="Write a detailed medical note about the patient. You can use the editor to compose your note and paste it here once done."
              />
            </Form.Group>
            <br />
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Diagnosis and/or Medical Note Status</Text>
            <Form.Group id="diagnosisstatus">
              <Input
                type="diagnosisstatus"
                name="diagnosisstatus"
                {...register('diagnosisstatus', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="Active? or Pending?"
              />
            </Form.Group>
            <Form.Group>
              <Button onClick={handleSubmit(submitForm)} mt={7} w="100%" colorScheme="blue">
                SUBMIT
              </Button>
            </Form.Group>
            <br />
          </Box>
        </Center>
      </Box>
    </>
  );
}

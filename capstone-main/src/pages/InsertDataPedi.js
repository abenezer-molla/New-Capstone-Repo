import React, { useState, useEffect } from 'react';
import { Box, Input, Center, Divider, Text, Button, Textarea, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper, ListItem, NumberInputField, NumberInput, UnorderedList } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap';

export default function InsertDataPedi() {
  const [show, setShow] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverResponse, setServerResponse] = useState('');
  const [doctorDisplay, setDoctorDisp] = useState();
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const navigate = useNavigate();
  const submitForm = (data) => {
    const body = {
      patientid: data.patientid,
      patientfirstname: data.patientfirstname,
      patientlastname: data.patientlastname,
      address: data.address,
      gender: data.gender,
      medicalnote: data.medicalnote,
      age: data.age,
      department: 'Pediatrics',
      currentdepartment: data.currentdepartment,
      status: data.status,
      diagnosisstatus: data.diagnosisstatus,
      doctorfirstname: data.doctorfirstname,
      doctorlastname: data.doctorlastname,
      doctorid: data.doctorid,
      doctorusername: data.doctorusername,
      date: new Date(),
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
        setServerResponse('Data Submitted Successfully');
        setShow(true);
      })
      .catch((err) => console.log(err));

    fetch('/referrals/referrals', requestOptions)
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        setServerResponse('Data Submitted Successfully');
        setShow(true);
      })
      .catch((err) => console.log(err));

    reset();
    navigate('/patients');
  };

  const requestOptionsGet = {
    headers: {
      'Authorization': `Bearer ${JSON.parse(token)}`,
    },
  };

  const [text, setText] = useState('');
  const [usernames, setUsernames] = useState([]);
  const submitFormDepart = (input) => {
    fetch(`/auth/doctors/${input.department}`)
      .then((res) => res.json())
      .then((dataa) => setUsernames(dataa))
      .catch((err) => console.log(err));
    reset();
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleSelect = (username) => {
    setText(`${text}${username}`);
  };

  const regex = /(\w+)/;
  const match = text.match(regex);
  const currentUsername = match ? match[1] : '';
  console.log('username', usernames);
  const options = usernames
    .filter(({ username }) => username.startsWith(currentUsername))
    .map(({ username }) => (
      <option key={username} onClick={() => handleSelect(username)}>
        {username}
      </option>
    ));

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
            <br />
            <Form.Group id="status">
              <Form.Select {...register('status', { required: true })} id="status">
                <option>Select Status</option>
                <option value="Active">ACTIVE</option>
                <option value="DECEASED">DECEASED</option>
              </Form.Select>
            </Form.Group>
            <br />

            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Gender</Text>
            <br />
            <Form.Group id="gender">
              <Form.Select {...register('gender', { required: true })} id="gender">
                <option>Select Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Age </Text>
            <Form.Group id="age">
              <NumberInput
                defaultValue={0}
                min={0}
                max={150}
                type="age"
                name="age"
                {...register('age', { required: true })}
                required
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
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Patient's ID </Text>
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
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Referred Department </Text>
            <br />
            <Form.Group id="currentdepartment">
              <Form.Select {...register('currentdepartment', { required: true })} id="currentdepartment">
                <option>Select Department</option>
                <option value="Not Referred">I am not referring this case</option>
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
            <br />
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}>Detailed Medical Note about the Patient</Text>
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
            <br />
            <Form.Group id="diagnosisstatus">
              <Form.Select {...register('diagnosisstatus', { required: true })} id="diagnosisstatus" aria-label="Diagnosis Status">
                <option>Select Diagnosis Status</option>
                <option value="COMPLETE">COMPLETE</option>
                <option value="PENDING">PENDING</option>
              </Form.Select>
            </Form.Group>
            <br />
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> Current Date </Text>
            <Form.Group id="date">
              <Input
                type="date"
                name="date"
                {...register('date', { required: true })}
                required
                mt={3}
                mb={3}
                placeholder="MM/DD/YYYY"
              />
            </Form.Group>
            <br />
            <Text mt={3} style={{ lineHeight: '110%', fontWeight: 'bolder' }}> If referral is needed, search for doctors' usernames in the given departments, and click on one of the doctor's usernames. If change is needed, click 'RESET'. IF REFERRAL IS NOT REQUIRED, SO YOU CAN LEAVE IT BLANK. </Text>
            <form>
              <Form.Group>
                <br />
                <br />
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
                <Button as="sub" onClick={handleSubmit(submitFormDepart)}>Search</Button>
              </Form.Group>
            </form>
            <br/>
            <UnorderedList color="green.500">
              {options.length > 0 && options.map((option) => (
                <ListItem margin="15px"><Button onClick={handleChange}>{option}</Button></ListItem>
              ))}
              <ListItem><Button onClick={handleChange}>RESET</Button></ListItem>
            </UnorderedList>
            <Form.Group id="doctorusername">
              <Input
                value={text}
                type="doctorusername"
                name="doctorusername"
                {...register('doctorusername')}
                mt={3}
                mb={3}
                placeholder=""
              />
            </Form.Group>
            <br />
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

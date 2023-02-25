import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { CloseButton } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { BUTTON } from '.';

const Notification = () => {
  const { currentColor } = useStateContext();
  const [show, setShow] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [serverResponse, setServerResponse] = useState('');
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const navigate = useNavigate();
  const submitForm = (data) => {
    const body = {
      age: data.age,
      status: data.status,
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

    fetch('/doctorStatus/doctor_status', requestOptions)
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        setServerResponse('Data Submitted Successfully');
        setShow(true);
      })
      .catch((err) => console.log(err));

    reset();
    navigate('/HomePage');
  };

  const handleClose = () => {
    navigate('/patients');
  };
  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Doctor's Status</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme "> 5 New</button>
        </div>
        <BUTTON icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
        {/* <Button onClick={handleClose} borderRadius="50%" size="2xl">CLOSE</Button> */}
        {/* <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="black" size="2xl" borderRadius="50%" /> */}
      </div>
      <div className="mt-5 ">
        <div className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
          <Form.Group id="status">
            <Form.Select {...register('status', { required: true })} id="status">
              <option>Select Status</option>
              <option value="ON DUTY">ON DUTY</option>
              <option value="OUT OF OFFICE">OUT OF OFFICE</option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="mt-5">
          <Form.Group>
            <Button onClick={handleSubmit(submitForm)} mt={7} w="100%" colorScheme="blue">
              SUBMIT
            </Button>
          </Form.Group>
        </div>
      </div>
    </div>
  );
};

export default Notification;

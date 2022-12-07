import { CLS_NUMBERFORMATLIST_TB_BTN } from '@syncfusion/ej2-react-richtexteditor';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './PatientMedicalNote.css';

function PatientMedicalNote() {
  // eslint-disable-next-line react/destructuring-assignment
  const location = useLocation();
  const { diagnosisstatus, patientfirstname, patientlastname, patientid, medicalnote } = location.state;
  return (
    <div className="popup">
      <div>
        <br />
        <br />
        <div className="popup-inner">
          <h1 style={{ fontSize: '30px', fontWeight: '900' }}> Patient's ID :  </h1> 
          <h1 style={{ color: 'blue', fontSize: '30px', fontWeight: '900' }}>{patientid} </h1>
        </div>
        <br />
        <div className="popup-inner">
          <h1 style={{ fontSize: '30px', fontWeight: '900' }}> Status of Patient's Diagnosis :  </h1> 
          <h1 style={{ color: 'blue', fontSize: '30px', fontWeight: '900' }}>{diagnosisstatus} </h1>
        </div>
        <br />
        <br />
        <h1 style={{ fontSize: '30px', fontWeight: '900' }}> Detailed Medical Note for : </h1>
        <pre> <h1 style={{ color: 'blue', fontSize: '30px', fontWeight: '900' }}>{patientfirstname}</h1> <h1 style={{ color: 'blue', fontSize: '30px', fontWeight: '900' }}>{patientlastname}</h1> </pre>
        <br />
        <br />
        <br />
        <div className="popup-innerTwo">
          <h1 style={{ backgroundColor: 'lightblue', fontSize: '30px' }}>{medicalnote}</h1>
        </div>
      </div>
    </div>
  );
}

export default PatientMedicalNote;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, ThemeSettings } from './components';
import { HomePage, Recent, Doctors, Patients, Editor } from './pages';
import InsertDataPedi from './pages/InsertDataPedi';
import InsertDataGyne from './pages/InsertDataGyne';
import InsertDataCancer from './pages/InsertDataCancer';
import InsertDataChronic from './pages/InsertDataChronic';
import InsertDataInfectious from './pages/InsertDataInfectious';
import InsertDataInternalMed from './pages/InsertDataInternalMed';
import DoctorSearch from './pages/DoctorSearch';
import PatientSearch from './pages/PatientSearch';
import InsertDataSurgery from './pages/InsertDataSurgery';
import InsertDataEmergency from './pages/InsertDataEmergency';
import PatientMedicalNote from './pages/PatientMedicalNote';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import ReferralHistory from './pages/ReferralHistory';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = (props) => {
  const { isLoggedIn } = props;
  const { setCurrentColor, setCurrentMode, currentMode, themeSettings } = useStateContext();
  const [patients, setPatients] = useState();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  if (!isLoggedIn) {
    return <SignUp />;
  }

  useEffect(() => {
    fetch('/patients/patients')
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div>
          {themeSettings && (<ThemeSettings />)}

          <Routes>
            {/* dashboard  */}
            <Route path="/HomePage" element={<HomePage />} />

            {/* pages  */}
            <Route path="/Referrals" element={<PrivateRoute><Recent /></PrivateRoute>} />
            <Route path="/physicians" element={<PrivateRoute><Doctors /></PrivateRoute>} />
            <Route path="/patients" element={<PrivateRoute><Patients /></PrivateRoute>} />
            <Route path="/emergencyRoom" element={<PrivateRoute><InsertDataEmergency /></PrivateRoute>} />
            <Route path="/pediatrics" element={<PrivateRoute><InsertDataPedi /></PrivateRoute>} />
            <Route path="/chronicill" element={<PrivateRoute><InsertDataChronic /></PrivateRoute>} />
            <Route path="/intermedicine" element={<PrivateRoute><InsertDataInternalMed /></PrivateRoute>} />
            <Route path="/obsandgyne" element={<PrivateRoute><InsertDataGyne /></PrivateRoute>} />
            <Route path="/infectious" element={<PrivateRoute><InsertDataInfectious /></PrivateRoute>} />
            <Route path="/surgery" element={<PrivateRoute><InsertDataSurgery /></PrivateRoute>} />
            <Route path="/cancer" element={<PrivateRoute><InsertDataCancer /></PrivateRoute>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/medicalnote/:id" element={<PrivateRoute><PatientMedicalNote /></PrivateRoute>} />

            {/* apps  */}
            <Route path="/Patient-Search" element={<PatientSearch />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/Doctor-Search" patients={patients} element={<DoctorSearch />} />
            <Route path="/Referral-History" element={<ReferralHistory />} />

            {/* charts  */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, ThemeSettings } from './components';
import { HomePage, Recent, Calendar, Doctors, Patients, Kanban, Line, Editor } from './pages';
import InsertDataPedi from './pages/InsertDataPedi';
import InsertDataGyne from './pages/InsertDataGyne';
import InsertDataCancer from './pages/InsertDataCancer';
import InsertDataChronic from './pages/InsertDataChronic';
import InsertDataInfectious from './pages/InsertDataInfectious';
import InsertDataInternalMed from './pages/InsertDataInternalMed';
import InsertDataSurgery from './pages/InsertDataSurgery';
import InsertDataEmergency from './pages/InsertDataEmergency';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = (props) => {
  const { isLoggedIn } = props;
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
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

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div>
          {themeSettings && (<ThemeSettings />)}

          <Routes>
            {/* dashboard  */}
            <Route path="/HomePage" element={(<HomePage />)} />

            {/* pages  */}
            <Route path="/recent" element={<Recent />} />
            <Route path="/physicians" element={<Doctors />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/emergencyRoom" element={<InsertDataEmergency />} />
            <Route path="/pediatrics" element={<InsertDataPedi />} />
            <Route path="/chronicill" element={<InsertDataChronic />} />
            <Route path="/intermedicine" element={<InsertDataInternalMed />} />
            <Route path="/obsandgyne" element={<InsertDataGyne />} />
            <Route path="/infectious" element={<InsertDataInfectious />} />
            <Route path="/surgery" element={<InsertDataSurgery />} />
            <Route path="/cancer" element={<InsertDataCancer />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* apps  */}
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/calendar" element={<Calendar />} />

            {/* charts  */}
            <Route path="/line" element={<Line />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

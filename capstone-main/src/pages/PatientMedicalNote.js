import { CLS_NUMBERFORMATLIST_TB_BTN } from '@syncfusion/ej2-react-richtexteditor';
import { useLocation } from 'react-router-dom';
import './PatientMedicalNote.css';
import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar, Selection } from '@syncfusion/ej2-react-grids';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const PatientMedicalNote = () => {
  const location = useLocation();
  const { diagnosisstatus, patientfirstname, patientlastname, patientid, medicalnote } = location.state;
  const ordersData = [
    {
      patientid,
      medicalnote,
    },
  ];

  const patients = {
    result: ordersData,
    count: ordersData?.length,

  };

  const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['PdfExport'];

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  let grid = null;
  const toolbarClick = (arg) => {
    if (grid) {
      if (arg.item.id.includes('pdfexport')) {
        grid.pdfExport({
          fileName: 'Medical_Note.pdf',
          theme: {
            record: {
              fontSize: 10,
              fontName: 'Calibri',
            },
          },
        });
      }
    }
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="grid grid-cols-12 gap-20">
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-10 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              }
          >
            <div className="fixed right-10 top-4" style={{ zIndex: '1000' }}>
              <Navbar />
            </div>
          </div>
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Medical Note of a Patient" />
            <h1> THE TABLE BELOW CAN BE EXPORTED AS PDF. </h1>
            <br />
            <GridComponent
              ref={g => grid = g}
              id="grid"
              dataSource={patients}
              allowPaging
              allowSorting
              allowExcelExport
              allowPdfExport
              selectionSettings={selectionsettings}
              toolbar={toolbarOptions}
              toolbarClick={toolbarClick}
              // eslint-disable-next-line react/jsx-no-bind
              editSettings={editing}
            >
              <ColumnsDirective>
                <ColumnDirective headerText="Patient ID" field="patientid" width="150" textAlign="Right" />
                <ColumnDirective headerText="Patient Firstname" field="patientfirstname" width="150" textAlign="Right" />
                <ColumnDirective headerText="Patient Lastname" field="patientlastname" width="150" textAlign="Right" />
                <ColumnDirective headerText="Medical Note" field="medicalnote" width="600" />
              </ColumnsDirective>
              <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Selection, Toolbar]} />
            </GridComponent>
            <br />
            <div>
              <h1 style={{ fontSize: '14px' }}>Medical Note For: <br /> <pre> {patientfirstname} {patientlastname}</pre></h1>
              <br />
              <h1>Patient ID: {patientid} </h1>
              <br />
              <h1>Diagnosis Status: {diagnosisstatus} </h1>
              <br />
              <text> {medicalnote} </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientMedicalNote;

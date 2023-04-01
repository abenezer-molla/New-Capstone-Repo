import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar, Selection } from '@syncfusion/ej2-react-grids';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { contextMenuItems, employeesGrid } from '../data/dummy';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const DoctorSearch = () => {
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
  const [show, setShow] = React.useState(false);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [];
  const [doctorDisplay, setDoctorDisp] = useState();
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, setThemeSettings } = useStateContext();
  const submitForm = (input) => {
    fetch(`/auth/doctors/${input.doctorid}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctorDisp({
          result: data, // array with data to be displayed in the grid
          count: data?.length,
        });
      })
      .catch((err) => console.log(err));
    reset();
  };

  const submitFormDepart = (input) => {
    fetch(`/auth/doctors/${input.department}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctorDisp({
          result: data, // array with data to be displayed in the grid
          count: data?.length,
        });
      })
      .catch((err) => console.log(err));
    reset();
  };

  useEffect(() => { // react hook to set color
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <form style={{ paddingLeft: 30, paddingRight: 800 }}>
          <Form.Group>
            <br />
            <br />
            <Form.Control
              maxLength={10}
              type="doctorid"
              placeholder="Enter Doctor ID to Search"
              {...register('doctorid',{required:false,maxLength:25})}
            />
          </Form.Group>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(submitForm)}>Search</Button>
          </Form.Group>
          <br />
        </form>
        <form style={{ paddingLeft: 30, paddingRight: 800 }}>
          <Form.Group>
            <br />
            <br />
            <Form.Control
              maxLength={10}
              type="department"
              placeholder="Enter Department to Search for Doctors With in the Given Department."
              {...register('department',{required:false,maxLength:25})}
            />
          </Form.Group>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={handleSubmit(submitFormDepart)}>Search</Button>
          </Form.Group>
          <br />
        </form>
      </div>
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
            <Header category="Page" title="Search a Doctor/Doctors by ID or Department" />
            <GridComponent
              id="gridcomp"
              dataSource={doctorDisplay}
              allowPaging
              allowSorting
              allowExcelExport
              allowPdfExport
              selectionSettings={selectionsettings}
              toolbar={toolbarOptions}
              // eslint-disable-next-line react/jsx-no-bind
              contextMenuItems={contextMenuItems}
              editSettings={editing}
            >
              <ColumnsDirective>
                {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              </ColumnsDirective>
              <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Selection, Toolbar]} />
            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorSearch;

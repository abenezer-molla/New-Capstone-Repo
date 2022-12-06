import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, PdfExport, ExcelExport, Selection, Inject, Edit, Toolbar, Sort, Filter, ToolbarItems } from '@syncfusion/ej2-react-grids';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import { customersGrid } from '../data/dummy';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Patients = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Edit', 'Search', 'PdfExport'];
  const [patients, setPatients] = useState();
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  function refreshGrid() {
    fetch('/patients/patients')
      .then((res) => res.json())
      .then((data) => {
        setPatients({
          result: data, // array with data to be displayed in the grid
          count: data?.length,
        });
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshGrid();
  }, []);

  function dataSourceChanged(state) {
    if (state.action === 'edit') {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(state.data),
      };

      fetch(`/patients/patients/${state.data.patientid}`, requestOptions)
        .then((res) => res.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          console.log('DATA =', data);
        })
        .catch((err) => console.log(err));

      fetch('/patients/patients')
        .then((res) => res.json())
        .then((data) => {
          setPatients({
            result: data, // array with data to be displayed in the grid
            count: data?.length,
          });
        })
        .catch((err) => console.log(err));
    } else if (state.requestType === 'delete') {
      const requestOptionsTwo = {
        method: 'delete',
      };
      fetch(`/patients/patients/${state.data[0].patientid}`, requestOptionsTwo)
        .catch((err) => console.log(err));
    }
  }
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
            <Header category="Page" title="Patients" />
            <GridComponent
              dataSource={patients}
              // eslint-disable-next-line react/jsx-no-bind
              dataSourceChanged={dataSourceChanged}
              enableHover
              allowPaging
              // allowGrouping
              groupSettings={{ columns: ['department'] }}
              pageSettings={{ pageCount: 5 }}
              selectionSettings={selectionsettings}
              toolbar={toolbarOptions}
              editSettings={editing}
              allowExcelExport
              allowPdfExport
              allowSorting
            >
              <ColumnsDirective>
                {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              </ColumnsDirective>
              <Inject services={[Page, Selection, Toolbar, ExcelExport, PdfExport, Edit, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;

import React, { useEffect, useState } from 'react';
import { GridComponent, Selection, Inject, ColumnsDirective, ColumnDirective, Search, Page, Edit, Toolbar, Sort, Filter, PdfExport } from '@syncfusion/ej2-react-grids';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeesGrid } from '../data/dummy';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Doctors = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Edit', 'Search', 'PdfExport'];
  const searchOptions = { fields: [
    'username',
    'doctorid',
  ],
  key: '' };
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const [doctors, setDoctors] = useState();
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

  const requestOptionsGet = {
    headers: {
      'Authorization': `Bearer ${JSON.parse(token)}`,
    },
  };

  function refreshGrid() {
    fetch('/auth/doctors', requestOptionsGet)
      .then((res) => res.json())
      .then((data) => {
        setDoctors({
          result: data, // array with data to be displayed in the grid
          count: data?.length,
        });
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    refreshGrid();
  }, []);

  console.log('doctors', doctors);

  function dataSourceChanged(state) {
    console.log(state);
    if (state.action === 'edit') {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify(state.data),
      };

      fetch(`/auth/doctors/${state.data.doctorid}`, requestOptions)
        .then((res) => res.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          console.log('DATA =', data);
        })
        .then(res => state.endEdit())
        .catch((err) => console.log(err));
    } else if (state.requestType === 'delete') {
      const requestOptionsTwo = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
      };
      fetch(`/auth/doctors/${state.data.doctorid}`, requestOptionsTwo)
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
            <Header category="Page" title="Physicians" />
            <GridComponent
              dataSource={doctors}
              // eslint-disable-next-line react/jsx-no-bind
              dataSourceChanged={dataSourceChanged}
              enableHover
              allowPaging
              width="auto"
              // allowGrouping
              groupSettings={{ columns: ['department'] }}
              pageSettings={{ pageCount: 5 }}
              selectionSettings={selectionsettings}
              toolbar={toolbarOptions}
              editSettings={editing}
              searchSettings={searchOptions}
              allowExcelExport
              allowPdfExport
              allowSorting
            >
              <ColumnsDirective>
                {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              </ColumnsDirective>
              <Inject services={[Page, Selection, Toolbar, PdfExport, Edit, Sort, Filter]} />

            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Doctors;

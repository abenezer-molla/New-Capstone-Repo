import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar, Selection } from '@syncfusion/ej2-react-grids';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { contextMenuItems, ordersGrid } from '../data/dummy';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Recent = () => {
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Edit', 'Search', 'PdfExport'];
  const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
  const [patients, setPatients] = useState();
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${JSON.parse(token)}`,
    },
  };
  function refreshGrid() {
    fetch('/patients/patients/referral', requestOptions)
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
      const requestOptionsThree = {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify(state.data),
      };
      fetch(`/patients/patients/${state.data.patientid}`, requestOptionsThree)
        .then((res) => res.json())
        .then((res) => state.endEdit())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          console.log('DATA =', data);
        })
        .catch((err) => console.log(err));
      const requestOptionsTwo = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(state.data),
      };
      fetch('/referrals/referrals', requestOptionsTwo)
        .then((res) => res.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          setServerResponse('Data Submitted Successfully');
          setShow(true);
        })
        .catch((err) => console.log(err));
    } else if (state.requestType === 'delete') {
      const requestOptionsTwo = {
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`,
        },
      };
      fetch(`/patients/patients/${state.data[0].patientid}`, requestOptionsTwo)
        .then((res) => state.endEdit())
        .catch((err) => console.log(err));
    }
  }

  console.log('patients', patients);

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
            <Header category="Page" title="Referrals for Current User" />
            <GridComponent
              id="gridcomp"
              dataSource={patients}
              allowPaging
              allowSorting
              allowExcelExport
              allowPdfExport
              selectionSettings={selectionsettings}
              toolbar={toolbarOptions}
              // eslint-disable-next-line react/jsx-no-bind
              dataSourceChanged={dataSourceChanged}
              contextMenuItems={contextMenuItems}
              editSettings={editing}
            >
              <ColumnsDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              </ColumnsDirective>
              <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Selection, Toolbar]} />
            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recent;

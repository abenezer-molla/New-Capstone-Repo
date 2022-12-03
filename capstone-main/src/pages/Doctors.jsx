import React, { useEffect, useState } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header, Navbar, Sidebar } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Doctors = () => {
  const toolbarOptions = ['Search'];
  const [doctors, setDoctors] = useState();
  const editing = { allowDeleting: true, allowEditing: true };
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    fetch('/auth/doctors')
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
              width="auto"
              allowPaging
              allowSorting
              pageSettings={{ pageCount: 5 }}
              editSettings={editing}
              toolbar={toolbarOptions}
            >
              <ColumnsDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
              </ColumnsDirective>
              <Inject services={[Search, Page]} />

            </GridComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Doctors;

import React from 'react';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <Topbar></Topbar>
      <Outlet></Outlet>
    </>
  );
}

export default Layout;

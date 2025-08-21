import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow">
        {/* Child routes (ViewDrivers, AddDriver, etc.) will be rendered here */}
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
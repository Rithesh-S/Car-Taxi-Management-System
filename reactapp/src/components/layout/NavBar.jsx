import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, UserGroupIcon, GlobeAltIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();

  const activeLinkStyle = {
    backgroundColor: '#eff6ff', // blue-100
    color: '#2563eb' // blue-700
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 p-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">FleetPro</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-6">
              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/drivers"
                      style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                      <UserGroupIcon className="h-5 w-5" /> View Drivers
                    </NavLink>
                  </li>
                   <li>
                    <NavLink
                      to="/admin/add-driver"
                      style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                       Add Driver
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                      <HomeIcon className="h-5 w-5" /> Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
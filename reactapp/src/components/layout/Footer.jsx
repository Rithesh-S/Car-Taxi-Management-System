import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} FleetPro Admin Dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
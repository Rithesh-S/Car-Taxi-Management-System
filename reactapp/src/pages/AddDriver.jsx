import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import DriverForm from '../components/ui/DriverForm';
import { ArrowLeftIcon, UserPlusIcon, TruckIcon } from '@heroicons/react/24/outline';

function AddDriver() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddDriver = async (formData) => {
    setIsSubmitting(true);
    try {
      await api.post('/admin/drivers', formData);
      // On success, navigate to the drivers list
      navigate('/admin/drivers'); 
    } catch (error) {
      console.error('Error adding driver:', error);
      // You can add error handling feedback here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mt-16 mr-32">
          <div className="bg-blue-200/30 rounded-full w-64 h-64"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-32">
          <div className="bg-indigo-200/30 rounded-full w-96 h-96"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with illustration */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={() => navigate('/admin/drivers')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50 border border-blue-100"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Drivers
          </button>
          
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">{/* You can add dynamic count here if needed */}</span>
              drivers in fleet
            </div>
          </div>
        </div>
        
        {/* Main form card */}
        <div className="bg-white  rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Gradient header with pattern */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" className="text-white">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="currentColor" />
                <path d="M0,0 C50,50 50,100 100,100 L100,0 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="flex items-center relative z-10">
              <div className="bg-white/20 p-3 rounded-xl mr-4 backdrop-blur-sm">
                <UserPlusIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-sm">Register New Driver</h2>
                <p className="text-blue-100 mt-1 opacity-90">Add a new driver to your growing fleet</p>
              </div>
            </div>
          </div>
          
          {/* Form content with subtle pattern */}
          <div className="p-8 relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative flex justify-center z-10">
              <DriverForm
                onSubmit={handleAddDriver}
                isSubmitting={isSubmitting}
                formTitle="Register New Driver"
                submitButtonText="Register Driver"
              />
            </div>
          </div>
        </div>

        {/* Additional information section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Quick Tips</h3>
              <p className="text-sm text-gray-600">
                Ensure all driver information is accurate. Double-check license numbers and contact details before submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDriver;
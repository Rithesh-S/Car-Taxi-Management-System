import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import DriverForm from '../components/ui/DriverForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function EditDriver() {
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // Gets the driver ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await api.get(`/admin/drivers/${id}`);
        setDriver(response.data);
      } catch (error) {
        console.error('Error fetching driver details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDriver();
  }, [id]);

  const handleUpdateDriver = async (formData) => {
    setIsSubmitting(true);
    try {
      await api.put(`/admin/drivers/${id}`, formData);
      navigate('/admin/drivers');
    } catch (error) {
      console.error('Error updating driver:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Driver Not Found</h3>
          <p className="text-gray-600 mb-6">The driver you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/drivers')}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Drivers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/drivers')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Drivers
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Edit Driver Details</h2>
            <p className="text-blue-100">Update the information for driver #{id}</p>
          </div>
          
          <div className="p-6 flex justify-center">
            <DriverForm
              onSubmit={handleUpdateDriver}
              initialData={driver}
              isSubmitting={isSubmitting}
              formTitle="Edit Driver Details"
              submitButtonText="Update Driver"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDriver;
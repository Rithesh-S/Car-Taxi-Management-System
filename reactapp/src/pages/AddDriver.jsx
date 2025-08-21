import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import DriverForm from '../components/ui/DriverForm';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <DriverForm
        onSubmit={handleAddDriver}
        isSubmitting={isSubmitting}
        formTitle="Register New Driver"
        submitButtonText="Register Driver"
      />
    </div>
  );
}

export default AddDriver;
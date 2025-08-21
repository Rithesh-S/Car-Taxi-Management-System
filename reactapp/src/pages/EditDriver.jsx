import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import DriverForm from '../components/ui/DriverForm';

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
    return <div className="text-center p-10">Loading driver details...</div>;
  }

  if (!driver) {
    return <div className="text-center p-10">Driver not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <DriverForm
        onSubmit={handleUpdateDriver}
        initialData={driver}
        isSubmitting={isSubmitting}
        formTitle="Edit Driver Details"
        submitButtonText="Update Driver"
      />
    </div>
  );
}

export default EditDriver;
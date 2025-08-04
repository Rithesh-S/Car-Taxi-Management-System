import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDriver() {
  const [formData, setFormData] = useState({
    driverName: "",
    city: "",
    phone: "",
    vehicleType: "",
    licenseNumber: "",
    assignedArea: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!formData.driverName) tempErrors.driverName = "Driver Name is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      tempErrors.phone = "Valid 10-digit phone number required";
    if (!formData.vehicleType) tempErrors.vehicleType = "Vehicle Type is required";
    if (!formData.licenseNumber) tempErrors.licenseNumber = "License Number is required";
    if (!formData.assignedArea) tempErrors.assignedArea = "Assigned Area is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8080/addDriver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({
          driverName: "",
          city: "",
          phone: "",
          vehicleType: "",
          licenseNumber: "",
          assignedArea: ""
        });
      } else {
        console.error("Failed to register driver");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#111827',
          textAlign: 'center'
        }}>
          Register a New Driver
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="driverName" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Driver Name
            </label>
            <input
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.driverName ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.driverName && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.driverName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              City
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.city ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.city && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.phone ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.phone && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="vehicleType" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Vehicle Type
            </label>
            <input
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.vehicleType ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.vehicleType && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.vehicleType}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="licenseNumber" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              License Number
            </label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.licenseNumber ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.licenseNumber && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.licenseNumber}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assignedArea" style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}>
              Assigned Area
            </label>
            <input
              id="assignedArea"
              name="assignedArea"
              value={formData.assignedArea}
              onChange={handleChange}
              style={{
                marginTop: '0.25rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: `1px solid ${errors.assignedArea ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
            {errors.assignedArea && (
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#ef4444' }}>
                {errors.assignedArea}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#ffffff',
              backgroundColor: '#6366f1',
              cursor: 'pointer'
            }}
          >
            Register Driver
          </button>
        </form>

        {success && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
              maxWidth: '20rem',
              width: '100%',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#16a34a',
                fontWeight: '500',
                marginBottom: '1rem',
                fontSize: '1rem'
              }}>
                Driver registered successfully!
              </p>
              <button
                onClick={() => navigate("/ViewDriver")}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.375rem',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#ffffff',
                  backgroundColor: '#6366f1',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddDriver;
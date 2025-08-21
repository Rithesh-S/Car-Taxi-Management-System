import React, { useState, useEffect } from 'react';
import { UserIcon, MapPinIcon, PhoneIcon, TruckIcon, IdentificationIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

function DriverForm({ onSubmit, initialData = null, isSubmitting, formTitle, submitButtonText }) {
  const [formData, setFormData] = useState({
    driverName: "", city: "", phone: "", vehicleType: "", licenseNumber: "", assignedArea: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const vehicleTypes = ["Sedan", "SUV", "Van", "Truck", "Hatchback"];
  const assignedAreas = ["North Zone", "South Zone", "East Zone", "West Zone", "Central Hub"];

  const validate = () => {
    let tempErrors = {};
    if (!formData.driverName.trim()) tempErrors.driverName = "Driver Name is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.vehicleType) tempErrors.vehicleType = "Please select a Vehicle Type";
    if (!formData.licenseNumber.trim()) tempErrors.licenseNumber = "License Number is required";
    if (!formData.assignedArea) tempErrors.assignedArea = "Please select an Assigned Area";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const fields = [
    { id: "driverName", label: "Driver Name", type: "text", icon: UserIcon },
    { id: "city", label: "City", type: "text", icon: MapPinIcon },
    { id: "phone", label: "Phone", type: "tel", icon: PhoneIcon },
    { id: "vehicleType", label: "Vehicle Type", type: "select", options: vehicleTypes, icon: TruckIcon },
    { id: "licenseNumber", label: "License Number", type: "text", icon: IdentificationIcon },
    { id: "assignedArea", label: "Assigned Area", type: "select", options: assignedAreas, icon: GlobeAltIcon }
  ];

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">{formTitle}</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <field.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              {field.type === "select" ? (
                <select
                  id={field.id} name={field.id} value={formData[field.id]} onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm transition ${errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                >
                  <option value="" disabled>{`Select ${field.label}`}</option>
                  {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input
                  id={field.id} name={field.id} type={field.type} value={formData[field.id]} onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg shadow-sm transition ${errors[field.id] ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </div>
            {errors[field.id] && <p className="mt-1 text-xs text-red-600">{errors[field.id]}</p>}
          </div>
        ))}
        <div className="pt-4">
          <button
            type="submit" disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Saving...' : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DriverForm;
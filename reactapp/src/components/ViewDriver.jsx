import React, { useEffect, useState } from "react";

function ViewDriver() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/getAllDrivers")
      .then(res => res.json())
      .then(data => setDrivers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6', // Light gray, matching AddDriver and Home
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#111827', // Dark gray, matching Home
        marginBottom: '1.5rem',
        textAlign: 'center',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
      }}>
        All Drivers
      </h2>
      <div style={{
        width: '100%',
        maxWidth: '80rem', // Constrain table width for readability
        overflowX: 'auto' // Horizontal scroll for small screens
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#ffffff', // White background for table
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
          fontSize: '0.875rem' // Smaller font for dense data
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#1f2937', // Dark gray, matching NavBar and Footer
              color: '#ffffff', // White text for contrast
              textAlign: 'left'
            }}>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db' // Light gray border
              }}>Driver Name</th>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db'
              }}>City</th>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db'
              }}>Phone</th>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db'
              }}>Vehicle Type</th>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db'
              }}>License Number</th>
              <th style={{
                padding: '0.75rem 1rem',
                fontWeight: '600',
                borderBottom: '1px solid #d1d5db'
              }}>Assigned Area</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver.id || index} style={{
                backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff', // Alternating row colors
                transition: 'background-color 0.2s', // Smooth hover transition
                ':hover': { backgroundColor: '#e5e7eb' } // Light gray on hover (reference)
              }}>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb', // Light gray border
                  color: '#111827' // Dark gray text
                }}>{driver.driverName}</td>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#111827'
                }}>{driver.city}</td>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#111827'
                }}>{driver.phone}</td>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#111827'
                }}>{driver.vehicleType}</td>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#111827'
                }}>{driver.licenseNumber}</td>
                <td style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #e5e7eb',
                  color: '#111827'
                }}>{driver.assignedArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewDriver;
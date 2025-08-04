import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{
      backgroundColor: '#1f2937', // Dark gray, matching Footer
      padding: '1rem 2rem', // Padding for spacing
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', // Space between title and links
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      position: 'sticky', // Sticky nav for visibility
      top: 0,
      zIndex: 10,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#ffffff', // White for contrast
        margin: 0,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // Subtle shadow for readability
      }}>
        Car Taxi Management
      </h1>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem', // Space between links
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{
            color: '#ffffff', // White for links
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s', // Smooth hover transition
            ':hover': { backgroundColor: '#374151' }, // Darker gray on hover (reference)
            ':focus': {
              outline: 'none',
              boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)' // Focus ring
            }
          }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/ViewDriver" style={{
            color: '#ffffff', // White for links
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s', // Smooth hover transition
            ':hover': { backgroundColor: '#374151' }, // Darker gray on hover (reference)
            ':focus': {
              outline: 'none',
              boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)' // Focus ring
            }
          }}>
            View Drivers
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
import React from "react";
import { Link } from "react-router-dom";
// import backgroundImage from "../assets/background.jpg"; // Uncomment if you have an image

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6', // Light gray background, matching AddDriver
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      textAlign: 'center',
      backgroundImage: 'url("/path/to/background.jpg")', // Replace with actual path or remove if not using
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: '#111827', // Dark gray for contrast
        marginBottom: '1.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Subtle text shadow for depth
      }}>
        Welcome to Car Taxi Management
      </h2>
      <img
        src="/path/to/background.jpg" // Replace with actual image path or placeholder
        alt="background"
        style={{
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '300px',
          borderRadius: '0.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'block',
          objectFit: 'cover'
        }}
      />
      <Link to="/driver">
        <button style={{
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.375rem',
          backgroundColor: '#6366f1', // Blue, matching AddDriver button
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          ':hover': { backgroundColor: '#4f46e5' }, // Hover effect (not supported inline, for reference)
          ':focus': {
            outline: 'none',
            boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px rgba(99, 102, 241, 0.5)'
          }
        }}>
          Register Driver
        </button>
      </Link>
    </div>
  );
}

export default Home;
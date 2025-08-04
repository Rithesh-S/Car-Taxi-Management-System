import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1f2937', 
      color: '#ffffff', 
      padding: '1rem 0', 
      textAlign: 'center', 
      fontSize: '0.875rem', 
      fontWeight: '400', 
      position: 'relative', 
      width: '100%', 
      boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: 'auto'
    }}>
      <p style={{
        margin: 0,
        letterSpacing: '0.025em'
      }}>
        &copy; 2025 Car Taxi Management System
      </p>
    </footer>
  );
}

export default Footer;
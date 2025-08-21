import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ViewDrivers from './pages/ViewDrivers';
import AddDriver from './pages/AddDriver';
import EditDriver from './pages/EditDriver';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/admin/drivers" element={<ViewDrivers />} />
              <Route path="/admin/add-driver" element={<AddDriver />} />
              <Route path="/admin/edit-driver/:id" element={<EditDriver />} />
            </Route>
          </Route>

          {/* Optional: Add a 404 Not Found page */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
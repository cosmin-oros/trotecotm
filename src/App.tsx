import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/MainPage';
import { PageRoutes } from './Routes/PageRoutes';
import ListingPage from './Pages/ListingPage';
import RentalPage from './Pages/RentalPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path={PageRoutes.Login} element={<LoginPage />} />
      <Route path={PageRoutes.Signup} element={<SignupPage />} />

      {/* Application routes */}
      <Route path={PageRoutes.Main} element={<MainPage />} />
      <Route path={PageRoutes.Listing} element={<ListingPage />} />
      <Route path={PageRoutes.Rental} element={<RentalPage />} />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<Navigate to={PageRoutes.Login} replace />} />
    </Routes>
  );
}

export default App;

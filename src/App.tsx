import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Pages/MainPage';
import { PageRoutes} from './Routes/PageRoutes';
import ListingPage from './Pages/ListingPage';
import RentalPage from './Pages/RentalPage';

function App() {
  return (
    <Routes>
      <Route path={PageRoutes.Main} Component={MainPage}/>
      <Route path={PageRoutes.Listing} Component={ListingPage}/>
      <Route path={PageRoutes.Rental} Component={RentalPage}/>
    </Routes>
  );
}

export default App;

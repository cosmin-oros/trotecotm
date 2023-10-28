import React from 'react';
import '../styles.css'
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../Routes/PageRoutes';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAvN5FYavctE5fGBgkKdHUNjX--9lzACks",
  authDomain: "trotecotm.firebaseapp.com",
  projectId: "trotecotm",
  storageBucket: "trotecotm.appspot.com",
  messagingSenderId: "63406994923",
  appId: "1:63406994923:web:b943024511d07f630095ae",
  measurementId: "G-2WSVQ96EPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const MainPage = () => {
  const navigate = useNavigate();

  const onPostPress = () => {
    navigate(PageRoutes.Listing);
  };

  const onSearchPress = () => {
    navigate(PageRoutes.Rental);
  };

  return (
    <div className='main-container'>
      <div className='main-header'>
        <h1>Trot Eco TM</h1>
      </div>    
      <div className='content'>
        <div className='row-container'>
          <button className='btn-main' onClick={onPostPress}>
            Posteaza
          </button>
          <button className='btn-main' onClick={onSearchPress}>
            Cauta
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
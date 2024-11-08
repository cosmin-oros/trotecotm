import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ProgressBar from '../Components/ProgressBar';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { validateString, validateNumber, validateDate, validateColor } from '../utils/validation';
import '../styles.css';
import { commonColors, questions } from '../constants';
import QuestionForm from '../Components/QuestionForm';
import { FormData, Listing } from '../types';
import { PageRoutes } from '../Routes/PageRoutes';

const RentalPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    return (
      validateString(formData.q1) &&
      validateColor(formData.q2, commonColors) &&
      validateString(formData.q3) &&
      validateNumber(formData.q4) &&
      validateDate(formData.q5)
    );
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!validateForm()) {
      alert('Please fill out the form correctly.');
      return;
    }

    setLoading(true);

    try {
      const rentalsQuery = query(
        collection(db, 'rentals'),
        where('city', '==', formData.q5),
        where('price', '>=', Number(formData.q4) - 5),
        where('price', '<=', Number(formData.q4) + 5),
        where('date', '==', formData.q4)
      );
      const querySnapshot = await getDocs(rentalsQuery);

      const matchingListings: Listing[] = [];
      querySnapshot.forEach((doc) => {
        matchingListings.push(doc.data() as Listing);
      });

      setListings(matchingListings);

      if (matchingListings.length === 0) {
        alert('No listings found matching your criteria.');
        navigate(-1);
      } else {
        console.log('Matching Listings:', matchingListings);
      }
    } catch (error) {
      console.error('Error retrieving listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <h1 className="title">Rental Page</h1>
      <button className="back-button" onClick={goBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      {loading ? (
        <Lottie options={loadingOptions} height={120} width={120} />
      ) : (
        <>
          <ProgressBar currentStep={currentStep + 1} totalSteps={questions.length} />
          <QuestionForm 
            questions={questions.slice(currentStep, currentStep + 1)} 
            formData={formData} 
            handleChange={handleChange} 
          />
          <div className="form-buttons">
            {currentStep > 0 && (
              <button className="prev-button" onClick={prevStep}>Previous</button>
            )}
            {currentStep < questions.length - 1 ? (
              <button className="next-button" onClick={nextStep}>Next</button>
            ) : (
              <button className="submit-button" onClick={handleSubmit}>Search</button>
            )}
          </div>
          {listings.length > 0 && (
            <div className="listings-container">
              {listings.map((listing, index) => (
                <div key={index} className="listing-card">
                  <h3>{listing.name}</h3>
                  <p>Color: {listing.color}</p>
                  <p>Price: {listing.price}</p>
                  <p>Date: {listing.date}</p>
                  <p>City: {listing.city}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RentalPage;

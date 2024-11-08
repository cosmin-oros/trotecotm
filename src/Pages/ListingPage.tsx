import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import ProgressBar from '../Components/ProgressBar';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
import { validateString, validateNumber, validateDate, validateColor } from '../utils/validation';
import '../styles.css'; 
import { commonColors, questions } from '../constants';
import QuestionForm from '../Components/QuestionForm';
import { FormData } from '../types';
import { PageRoutes } from '../Routes/PageRoutes';

const ListingPage: React.FC = () => {
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
      const docRef = await addDoc(collection(db, 'rentals'), formData);
      console.log('Document written with ID: ', docRef.id);
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error('Error adding document: ', error);
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

  return (
    <div className="container">
      <h1 className="title">Listing Page</h1>
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
              <button className="submit-button" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingPage;

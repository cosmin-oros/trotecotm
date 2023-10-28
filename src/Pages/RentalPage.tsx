import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../Routes/PageRoutes';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Card from '../Components/Card';
import Lottie from 'react-lottie';
import loading from '../assets/loading.json';
import notFound from '../assets/notfound.json';

const firebaseConfig = {
  apiKey: "AIzaSyAvN5FYavctE5fGBgkKdHUNjX--9lzACks",
  authDomain: "trotecotm.firebaseapp.com",
  projectId: "trotecotm",
  storageBucket: "trotecotm.appspot.com",
  messagingSenderId: "63406994923",
  appId: "1:63406994923:web:b943024511d07f630095ae",
  measurementId: "G-2WSVQ96EPW"
};

const db = getFirestore();

interface FormData {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

interface Listing {
  name: string;
  color: string;
  contact: string;
  price: number;
  date: string;
  city: string;
}

const RentalPage = () => {
  const [progress, setProgress] = useState(10);
  const [displayTrotinete, setDisplayTrotinete] = useState(false);
  const [showLottie, setShowLottie] = useState(false);
  const backSign = "<-";
  const Sign = "->";
  const [listings, setListings] = useState<Listing[]>([]);
  const navigate = useNavigate();
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const notFoundOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const questions = [
    {
      title: "Cum te numesti?",
      type: "text",
      placeholder: "Alexandru Popescu",
      name: "q1",
    },
    {
      title: "Cat timp ai nevoie de trotineta?",
      type: "text",
      placeholder: "doua ore...",
      name: "q2",
    },
    {
        title: "Pret in lei per ora aproximativ?",
        type: "text",
        placeholder: "30",
        name: "q3",

    },
    {
        title: "Cand doresti sa o inchiriezi?",
        type: "date",
        placeholder: "Alege o zi",
        name: "q4",
    },
    {
        title: "In ce oras te afli?",
        type: "text",
        placeholder: "Timisoara",
        name: "q5",
    },
  ];

  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const onNextPress = () => {
    validateForm();
    if (isFormValid) {
      increaseProgress();
    }
  };

  const onSearchPress = async () => {
    validateForm();
    if (isFormValid) {
      try {
        const listingsCollection = collection(db, 'listings');
        const querySnapshot = await getDocs(listingsCollection);

        const fetchedListings: Listing[] = [];
        querySnapshot.forEach((doc) => {
            const listingData = doc.data() as Listing;
            
            console.log('pret ', formData.q3);
            if (listingData.city.toLowerCase() === formData.q5.toLowerCase() 
                && isPriceSimilar(formData.q3, listingData.price)
                && listingData.date === formData.q4) {
              const date = new Date(listingData.date);
              const formattedDate = date.toLocaleDateString();
              listingData.date = formattedDate;
              fetchedListings.push(listingData);
            }
        });

        setListings(fetchedListings);

        console.log('Listings:', listings);
      } catch (error) {
        console.error('Error getting listings:', error);
      }

      setShowLottie(true);

      setTimeout(() => {
        setDisplayTrotinete(true);  
        setShowLottie(false);
      }, 2000);

    }
  };

  const isPriceSimilar = (formDataPrice: string, listingPrice: number) => {
    const priceRange = 5; 

    const formDataPriceNumber = parseFloat(formDataPrice);

    if (
      !isNaN(formDataPriceNumber) && 
      Math.abs(formDataPriceNumber - listingPrice) <= priceRange
    ) {
      return true; 
    } else {
      return false; 
    }
  };

  const increaseProgress = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setProgress(progress + 10);
      setIsFormValid(false);
    }
  };

  const decreaseProgress = () => {
    if (step > 0) {
      setStep(step - 1);
      setProgress(progress - 10);
      setIsFormValid(false);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const [questionErrors, setQuestionErrors] = useState<string[]>([
    'Spune-ne cum te numesti!',
    'Introdu cat timp ai nevoie de trotineta!',
    'Introdu un pret valid!',
    'Zi invalida (MM-DD-YYYY)!',
    'Introdu orasul in care te afli!',
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateForm();
  };

  const getErrorByIndex = (index: number): string => {
    if (index >= 0 && index < questionErrors.length) {
      return questionErrors[index];
    }
    return ''; 
  };

  const setErrorAtIndex = (index: number, errorMessage: string) => {
    if (index >= 0 && index < questionErrors.length) {
      const updatedErrors = [...questionErrors];
      updatedErrors[index] = errorMessage;
      setQuestionErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const regexString = /^[^\s]+/;
    const regexNumber = /^\d+$/;
    const regexDate = /^\d{4}-\d{2}-\d{2}$/; 

    const newErrors = [
      regexString.test(formData[questions[step].name as keyof FormData]) ? '' : 'Spune-ne cum te numesti!',
      regexString.test(formData[questions[step].name as keyof FormData]) ? '' : 'Introdu cat timp ai nevoie de trotineta!',
      regexNumber.test(formData[questions[step].name as keyof FormData]) ? '' : 'Introdu un pret valid!',
      regexDate.test(formData[questions[step].name as keyof FormData]) ? '' : 'Zi invalida (MM-DD-YYYY)!',
      regexString.test(formData[questions[step].name as keyof FormData]) ? '' : 'Introdu orasul in care te afli!',
    ];

    setQuestionErrors(newErrors);

    setIsFormValid(getErrorByIndex(step) === '');
  };


  return (
    <div>
      <div className="fixed-header">
        <h2 className='go-back' onClick={() => navigate(PageRoutes.Main)}>{backSign} Inapoi</h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(progress / (questions.length * 10)) * 100}%` }}></div>
        </div>
      </div>
      <div className='fullscreen'>
        {showLottie && (
          <Lottie options={defaultOptions} height={200} width={200} />
        )}

        {displayTrotinete ? (
          
          <div className="listings-container">
            {listings.length === 0 && (
              <Lottie options={notFoundOptions} height={200} width={200} />
            )}
            
            {listings.slice(0, 10).map((listing, index) => (
              <Card key={index} listing={listing} />
            ))}
          </div>
        ) : (
          step < questions.length && (
            <div className='question'>
              <div className='q-title' onClick={decreaseProgress}>{backSign} {questions[step].title}</div>
              <div>
                <input
                  className='input-form'
                  type={questions[step].type}
                  name={questions[step].name}
                  placeholder={questions[step].placeholder}
                  autoComplete='off'
                  value={formData[questions[step].name as keyof FormData] || ''}
                  onChange={handleInputChange}
                />
                <div className="error-text">{getErrorByIndex(step)}</div>
              </div>
              {step < questions.length - 1 && (
                <button className='btn' onClick={onNextPress}>
                  Mai Departe {Sign}
                </button>
              )}
              {step === questions.length - 1 && (
                <button className='btn' onClick={onSearchPress}>
                  Cauta {Sign}
                </button>
              )}
              
            </div>
          )
        )}
      </div>
      
    </div>
  );
};

export default RentalPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../Routes/PageRoutes';
import '../styles.css';
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAvN5FYavctE5fGBgkKdHUNjX--9lzACks",
  authDomain: "trotecotm.firebaseapp.com",
  projectId: "trotecotm",
  storageBucket: "trotecotm.appspot.com",
  messagingSenderId: "63406994923",
  appId: "1:63406994923:web:b943024511d07f630095ae",
  measurementId: "G-2WSVQ96EPW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

interface FormData {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
}

const ListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(10);
  const backSign = "<-";
  const Sign = "->";
  const navigate = useNavigate();

  const questions = [
    {
      title: "Cum te numesti?",
      type: "text",
      placeholder: "Alexandru Popescu",
      name: "q1",
    },
    {
        title: "Care e culoarea trotinetei?",
        type: "text",
        placeholder: "Verde, rosie...",
        name: "q2",
    },
    {
      title: "Cum te pot contacta?",
      type: "text",
      placeholder: "Numar de telefon, mail...",
      name: "q3",
    },
    {
        title: "Pret in lei per ora?",
        type: "text",
        placeholder: "30",
        name: "q4",

    },
    {
        title: "Cand doresti sa o inchiriezi?",
        type: "date",
        placeholder: "Alege o zi",
        name: "q5",
    },
    {
        title: "In ce oras te afli?",
        type: "text",
        placeholder: "Timisoara",
        name: "q6",
    },
  ];

  const commonColors: string[] = [
    'rosu', 'albastru', 'verde', 'galben', 'portocaliu', 'mov', 'roz',
    'maro', 'alb', 'negru', 'gri', 'argintiu', 'aur', 'indigo', 'cian',
    'magenta', 'lavanda', 'turcoaz', 'bej', 'turcoaz', 'maro inchis', 'masline',
    'violet', 'cenusiu', 'coral', 'somon', 'bej deschis', 'menta', 'caki', 'pruna',
    'ardesia', 'ivoriu', 'rubin', 'topaz', 'safir', 'smarald', 'chihlimbar',
    'lamaie', 'portocala', 'orhidee',
  ];

  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const onNextPress = () => {
    validateForm();
    if (isFormValid) {
      increaseProgress();
    }
  };

  const onPostPress = () => {
    validateForm();
    if (isFormValid) {
      const listingsCollection = collection(db, 'listings');

      const data = {
        name: formData.q1,
        color: formData.q2,
        contact: formData.q3,
        price: Number(formData.q4),
        date: formData.q5,
        city: formData.q6,
      };

      console.log(data);

    
      addDoc(listingsCollection, data)
        .then(() => {
          console.log('Data successfully added to Firestore');
          navigate(PageRoutes.Main);
        })
        .catch((error: Error) => {
           console.error('Error adding data to Firestore: ', error);
      });

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
    q6: '',
  });

  const [questionErrors, setQuestionErrors] = useState<string[]>([
    'Spune-ne cum te numesti!',
    'Introdu o culoare valida!',
    'Introdu o metoda de contact valida!',
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
    const isColorValid = commonColors.includes(formData[questions[step].name as keyof FormData].toLowerCase());
    console.log(formData[questions[step].name as keyof FormData].toLowerCase(), isColorValid);

    const newErrors = [
      regexString.test(formData[questions[step].name as keyof FormData]) ? '' : 'Spune-ne cum te numesti!',
      isColorValid ? '' : 'Introdu o culoare valida!',
      regexString.test(formData[questions[step].name as keyof FormData]) ? '' : 'Introdu o metoda de contact valida!',
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
        {loading ? (
          <div>Se incarca..</div>
        ):(
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
                <button className='btn' onClick={onPostPress}>
                  Posteaza {Sign}
                </button>
              )}
              
            </div>
          )
        )}
      </div>
      
    </div>
  );
};

export default ListingPage;
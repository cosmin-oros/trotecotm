import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../Routes/PageRoutes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Logged in with Google');
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailLogin = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Registered successfully');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
      }
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <button onClick={handleGoogleLogin}>Continue with Google</button>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleEmailLogin}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'No account? Register'}
      </p>
    </div>
  );
};

export default LoginPage;

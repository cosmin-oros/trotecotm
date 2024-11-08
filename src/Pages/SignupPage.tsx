import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../Routes/PageRoutes';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      console.log('Attempting Google signup');
      await signInWithPopup(auth, googleProvider);
      alert('Signup successful with Google');
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error("Error with Google Signup:", error);
      alert('Failed to sign up with Google');
    }
  };

  const handleEmailSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Attempting to sign up with email');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful');
      console.log('Navigating to main page');
      navigate(PageRoutes.Main);
    } catch (error) {
      console.error("Error with Email Signup:", error);
      alert('Failed to sign up');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <button onClick={handleGoogleSignup}>Sign up with Google</button>
      <form onSubmit={handleEmailSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign up</button>
      </form>
      <p>Already have an account? <a href="/login">Log in here</a></p>
    </div>
  );
};

export default SignupPage;

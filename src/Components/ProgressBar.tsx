import React from 'react';
import { ProgressBarProps } from '../types';
import '../styles.css'; 

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;

import React from 'react';
import { FormData, QuestionFormProps } from '../types';
import '../styles.css';

const QuestionForm: React.FC<QuestionFormProps> = ({ questions, formData, handleChange }) => {
  return (
    <form className="question-form">
      {questions.map((question) => (
        <div key={question.name} className="form-group">
          <label className="form-label">{question.title}</label>
          <input
            type={question.type}
            name={question.name}
            value={formData[question.name as keyof FormData]}
            placeholder={question.placeholder}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      ))}
    </form>
  );
};

export default QuestionForm;

export type QuestionFormProps = {
  questions: Question[];
  formData: FormData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Question = {
  title: string;
  type: string;
  name: keyof FormData;
  placeholder: string;
};

export type FormData = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
};

export type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};
import { Question } from "./types";

export const commonColors = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'white', 'black', 'gray',
];

export const questions: Question[] = [
  { title: "What is your name?", type: "text", name: "q1", placeholder: "Alexandra Popescu" },
  { title: "What is the color of the scooter?", type: "text", name: "q2", placeholder: "Green, red..." },
  { title: "How can I contact you?", type: "text", name: "q3", placeholder: "Phone number, email..." },
  { title: "Price per hour in lei?", type: "text", name: "q4", placeholder: "30" },
  { title: "When do you want to rent it?", type: "text", name: "q5", placeholder: "YYYY-MM-DD" },
  { title: "Additional information", type: "text", name: "q6", placeholder: "Additional details" },
];

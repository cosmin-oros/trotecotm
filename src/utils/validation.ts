export const validateString = (value: string): boolean => /^[^\s]+/.test(value);

export const validateNumber = (value: string): boolean => /^\d+$/.test(value);

export const validateDate = (value: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const validateColor = (value: string, commonColors: string[]): boolean => 
  commonColors.includes(value.toLowerCase());

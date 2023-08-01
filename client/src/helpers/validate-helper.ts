interface IValidationRules {
  [key: string]: (value: string) => string | null;
}

interface IValidationErrors {
  [key: string]: string;
}
  
const validationRules: IValidationRules = {
  name: (value: string) => {
    if (!value) {
      return "Name is required.";
    } else if (value.trim().length === 0) {
      return "Name cannot be empty." 
    }
    return null;
  },
  content: (value: string)=> {
    if (!value) {
      return "Content is required.";
    } else if (value.trim().length === 0) {
      return "Content cannot be empty." 
    }
    return null;
  },
  category: (value: string) => {
    if (!value) {
      return "Category is required.";
    } 
    return null;
  }
};

export const getValidateForm = (values: { name: string, content: string, category: string }) => {
  const errors: IValidationErrors = {};
  Object.entries(values).forEach((item) => {
    const [key, value] = item;
    const validationRule = validationRules[key];
    if (validationRule) {
      const errorMessage = validationRule(value);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    }
  })
 
  return Object.entries(errors).length > 0 ? { isErrors: true, errors } : { isErrors: false, errors };
}
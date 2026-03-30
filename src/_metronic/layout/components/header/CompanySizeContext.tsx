import React, { createContext, useState } from 'react';
import { WithChildren } from '../../../helpers';

// Define the type for your global variable
type MyGlobalVariableType = {
  companySize: string;
  updateCompanySize: (newValue: string) => void;
};

// Create the initial context
const CompanySizeContext = createContext<MyGlobalVariableType>({
  companySize: '',
  updateCompanySize: () => {},
});

// Create a provider component that will wrap your app
export const CompanySizeContextProvider: React.FC<WithChildren> = ({ children }) => {
  const [companySize, setCompanySize] = useState('small');

  const updateCompanySize = (newValue: string) => {
    setCompanySize(newValue);
  };

  return (
    <CompanySizeContext.Provider value={{ companySize, updateCompanySize }}>
      {children}
    </CompanySizeContext.Provider>
  );
};

export default CompanySizeContext;
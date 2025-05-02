import React, { createContext, useContext, useState, useEffect } from 'react';

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(() => {
    return localStorage.getItem('country') || '';
  });

  useEffect(() => {
    if (country) {
      localStorage.setItem('country', country);
    }
  }, [country]);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext); 
import React, { createContext, useContext } from 'react';
import gunInstance from '../config/gunInstance';

const GunContext = createContext(gunInstance);

export const GunProvider = ({ children }) => {
  return <GunContext.Provider value={gunInstance}>{children}</GunContext.Provider>;
};

export const useGun = () => useContext(GunContext);

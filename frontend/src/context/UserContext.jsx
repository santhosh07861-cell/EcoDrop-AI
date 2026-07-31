import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState({
    notificationsEnabled: true,
    language: 'English'
  });

  return (
    <UserContext.Provider value={{ profile, setProfile, preferences, setPreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

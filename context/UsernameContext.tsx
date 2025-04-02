import React, { createContext, useState, useContext } from 'react';

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;
}

const UsernameContext = createContext<UsernameContextType>({ 
  username: 'User', 
  setUsername: () => {} 
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('User');

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUser = () => useContext(UsernameContext);
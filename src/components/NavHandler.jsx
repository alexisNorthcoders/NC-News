import { createContext, useState } from 'react';


export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [navigation, setNavigation] = useState({header:"home",username:"",avatar:""});

  return (
    <NavContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavContext.Provider>
  );
};
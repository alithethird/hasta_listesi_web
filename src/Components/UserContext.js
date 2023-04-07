// Framework imports
import React, { useState, createContext } from "react";

// Creates a context instance
export const UserContext = createContext();

// Provides the context to its child components
export const UserProvider = (props) => {
  const [userKey, setUserKey] = useState("none");

  return (
    <UserContext.Provider value={{ userKey, setUserKey}}>
      {props.children}
    </UserContext.Provider>
  );
};

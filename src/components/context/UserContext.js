import React, { useReducer, createContext, useEffect, useContext } from "react";
import { validateToken } from "../actions/userActions";
import { userReducer, initialState } from "../reducers/userReducer";

export const UserContext = createContext(null);

const UserProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("token")) validateToken(dispatch);
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;

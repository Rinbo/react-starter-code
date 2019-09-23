import React, { useReducer, createContext, useEffect } from "react";
import { validateToken } from "../actions/userActions";
import { userReducer, initialState } from "../reducers/userReducer";

const UserContext = createContext("user");

export const UserProvider = props => {
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

export default UserContext;

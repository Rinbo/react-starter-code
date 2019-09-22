import React, { useReducer, createContext, useEffect } from "react";
import { SET_USER, FLASH_MESSAGE } from "../types";

const UserContext = createContext("user");

const initialState = {
  name: "",
  isSignedIn: false,
  announcement: { message: "", code: 200, delay: 5000 }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.payload };
    case FLASH_MESSAGE:
      return { ...state, announcement: action.payload };
    default:
      return { ...state };
  }
};

export const UserProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const name = localStorage.getItem("playerName") || "";
    dispatch({ type: SET_USER, payload: name });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;

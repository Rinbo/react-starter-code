import React, { useReducer, createContext, useEffect } from "react";
import { validateToken } from "../actions/userActions";
import {
  SET_USER,
  FLASH_MESSAGE,
  UPDATE_USER,
  SIGN_IN,
  SIGN_OUT,
  STANDARD_DELAY
} from "../types";

const UserContext = createContext("user");

export const init = initialState => {
  return initialState;
};

const initialState = {
  user: {},
  name: "",
  email: "",
  isSignedIn: false,
  announcement: { message: "", code: 200, delay: STANDARD_DELAY }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, name: action.payload };
    case FLASH_MESSAGE:
      return { ...state, announcement: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        name: action.payload.name,
        email: action.payload.email
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        name: action.payload.name,
        email: action.payload.email,
        isSignedIn: true
      };
    case SIGN_OUT:
      return init(initialState);
    default:
      return { ...state };
  }
};

export const UserProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

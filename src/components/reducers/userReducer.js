import {
  FLASH_MESSAGE,
  UPDATE_USER,
  SIGN_IN,
  SIGN_OUT,
  STANDARD_DELAY
} from "../types";

const init = initialState => {
  return initialState;
};

export const initialState = {
  user: {},
  name: "",
  email: "",
  isSignedIn: false,
  announcement: { message: "", code: 200, delay: STANDARD_DELAY }
};

export const userReducer = (state, action) => {
  switch (action.type) {   
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

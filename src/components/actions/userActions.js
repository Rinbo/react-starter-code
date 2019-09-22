import endpoint from "../apis/endpoint";
import {
  SIGN_IN,
  SIGN_OUT,
  UPDATE_USER,
  FLASH_MESSAGE,
  SHORT_DELAY
} from "../types";
import { setHeaders, destroyToken } from "../apis/setHeaders";
import { parseErr } from "../utility/messageParser";
import history from "../history";

export const updateUser = async (obj, id, userDispatch) => {
  try {
    setHeaders();
    const response = await endpoint.put(`/users/${id}`, { ...obj });
    localStorage.setItem("token", response.headers.token);
    userDispatch({ type: UPDATE_USER, payload: response.data });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message: "Update successful", code: 200, delay: SHORT_DELAY }
    });
  } catch (e) {
    const [message, status] = parseErr(e);
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message, status, delay: SHORT_DELAY }
    });
  }
};

export const signInUser = async (obj, userDispatch) => {
  try {
    setHeaders();
    const response = await endpoint.post("/users/signin", { ...obj });
    localStorage.setItem("token", response.headers.token);
    userDispatch({ type: SIGN_IN, payload: response.data });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: {
        message: "Signin successful.  Welcome " + response.data.name,
        status: 200,
        delay: SHORT_DELAY
      }
    });
    history.push("/");
  } catch (e) {
    const [message, status] = parseErr(e);
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message, status },
      delay: SHORT_DELAY
    });
  }
};

export const signUpUser = async (obj, userDispatch) => {
  try {
    setHeaders();
    const response = await endpoint.post("/users/add", { ...obj });
    localStorage.setItem("token", response.headers.token);
    userDispatch({ type: SIGN_IN, payload: response.data });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: {
        message: "Signup successful.  Welcome " + response.data.name,
        status: 200,
        delay: SHORT_DELAY
      }
    });
    history.push("/");
  } catch (e) {
    const [message, status] = parseErr(e);
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message, status },
      delay: SHORT_DELAY
    });
  }
};

export const deleteUser = async (userDispatch, id) => {
  try {
    setHeaders();
    await endpoint.delete(`/users/${id}`);
    destroyToken();
    userDispatch({ type: SIGN_OUT });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: {
        message: "Account destroyed.  Bye bye... ",
        status: 200,
        delay: SHORT_DELAY
      }
    });
    history.push("/");
  } catch (e) {
    const [message, status] = parseErr(e);
    userDispatch({ type: SIGN_OUT });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message, status },
      delay: SHORT_DELAY
    });
  }
};

export const signOutUser = async userDispatch => {
  setHeaders();
  endpoint.delete("/users/signout");
  destroyToken();
  userDispatch({ type: SIGN_OUT });
  userDispatch({
    type: FLASH_MESSAGE,
    payload: {
      message: "You are now signed out but can continue to play",
      status: 200,
      delay: SHORT_DELAY
    }
  });
  history.push("/");
};

export const validateToken = async userDispatch => {
  try {
    setHeaders();
    endpoint.get("/users/validatetoken").then(response => {
      localStorage.setItem("token", response.headers.token);
      userDispatch({ type: SIGN_IN, payload: response.data });
      userDispatch({
        type: FLASH_MESSAGE,
        payload: {
          message: "Token validated. Welcome " + response.data.name,
          status: 200,
          delay: SHORT_DELAY
        }
      });
    });
  } catch (e) {
    const [message, status] = parseErr(e);
    userDispatch({ type: SIGN_OUT });
    userDispatch({
      type: FLASH_MESSAGE,
      payload: { message, status },
      delay: SHORT_DELAY
    });
  }
};

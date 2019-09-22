import axios from "axios";
import {
  LOCALHOST,
  PRODUCTION_BACKEND_URL,
  PRODUCTION_FRONTEND_URL,
  NETLIFY_FRONTEND_URL
} from "./urls";

let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === PRODUCTION_FRONTEND_URL || hostname === NETLIFY_FRONTEND_URL) {
  backendHost = PRODUCTION_BACKEND_URL;
} else {
  backendHost = LOCALHOST;
}

export default axios.create({
  baseURL: backendHost,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Content-Type": "application/json"
  }
});

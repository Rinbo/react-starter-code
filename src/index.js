import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./css/app.css";
import App from "./components/App";
import { UserProvider } from "./components/context/UserContext";

const AppWrapper = () => {
   return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

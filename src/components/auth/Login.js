import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Button } from "semantic-ui-react";
import { validations } from "./authValidations";
import AuthForm from "./AuthForm";
import { signInUser } from "../actions/userActions";

export default () => {
  const [name, updateName] = useState("");
  const [password, updatePassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const userContext = useContext(UserContext);

  useEffect(() => {
    validations(name, password, setErrors);
  }, [password, name]);

  const onSubmit = e => {
    e.preventDefault();
    if (errors.exist) {
      setShowErrors(true);
      return null;
    }
    setShowErrors(false);
    const body = { name, password };
    signInUser(body, userContext.dispatch);
  };

  return (
    <div className="ui container">
      <div className="ui middle aligned center aligned grid">
        <div className="column" style={{ maxWidth: 360 }}>
          <div className="content" style={{ marginTop: 20 }} />
          <form className="ui large form error" onSubmit={onSubmit}>
            <div className="ui basic segment">
              <AuthForm
                password={password}
                updatePassword={updatePassword}
                name={name}
                updateName={updateName}
                errors={errors}
                showErrors={showErrors}
                setShowErrors={setShowErrors}
              />
              <Button basic inverted color="green" style={{ width: "100%" }}>
                Login
              </Button>
            </div>

            <div className="ui error message" />
          </form>
        </div>
      </div>
    </div>
  );
};

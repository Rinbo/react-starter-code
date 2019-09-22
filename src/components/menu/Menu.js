import React, { useEffect, useState, useContext } from "./node_modules/react";
import UserContext from "../context/UserContext";
import { Button, Popup } from "./node_modules/semantic-ui-react";
import history from "../history";

export default () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userContext = useContext(UserContext);

  const styles = {
    icon: { color: "#cccccc", backgroundColor: "#1b1c1d" }
  };

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", onWindowChange);
    window.addEventListener("resize", onWindowChange);
  }, []);

  const onWindowChange = () => {
    setWindowWidth(window.innerWidth);
  };

  const renderUserLinks = () => {
    return (
      <>
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
              onClick={() => history.push("/")}
            >
              <i className="user icon borjessons-icon" style={styles.icon} />
            </Button>
          }
          content="Main page"
        />
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
            >
              <i
                className="sign-out icon borjessons-icon"
                style={styles.icon}
              />
            </Button>
          }
          content="Sign out"
        />
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <Popup
        trigger={
          <Button
            inverted
            basic
            color="green"
            className="item borjessons-link"
            onClick={() => history.push("/login")}
          >
            <i className="sign-in icon borjessons-icon" style={styles.icon} />
          </Button>
        }
        content="Sign-in"
      />
    );
  };

  const renderContent = () => {
    return (
      <div
        style={{ backgroundColor: "#171717" }}
        className={
          windowWidth < 769
            ? "ui bottom fixed fluid four item inverted menu"
            : "ui vertical icon menu inverted fixed-menu"
        }
      >
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
              onClick={() => history.push("/")}
            >
              <i className="code icon borjessons-icon" style={styles.icon} />
            </Button>
          }
          content="Link 1 tooltip"
        />
        <Popup
          trigger={
            <Button
              inverted
              basic
              color="green"
              className="item borjessons-link"
              onClick={() => history.push("/")}
            >
              <i className="trophy icon borjessons-icon" style={styles.icon} />
            </Button>
          }
          content="Link 2 tooltip"
        />

        {userContext.isSignedIn ? renderUserLinks() : renderAuthLinks()}
      </div>
    );
  };

  return renderContent;
};
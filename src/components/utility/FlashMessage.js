import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import AnimatedMessage from "./AnimatedMessage";

const FlashMessage = () => {
  const { announcement, dispatch } = useUserContext();
  const [showMessage, updateShowMessage] = useState("");

  useEffect(() => {
    updateShowMessage(announcement.message);
  }, [announcement.message]);

  if (showMessage === "") {
    return <div style={{ height: 20, margin: 10 }}></div>;
  }
  return (
    <AnimatedMessage
      message={announcement.message}
      code={announcement.code}
      delay={announcement.delay}
      dispatch={dispatch}
    />
  );
};

export default FlashMessage;

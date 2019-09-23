import React from "react";

const ShowUser = ({ props }) => {
  const id = props.match.params.id;
  return <div>User page with param {id}</div>;
};

export default ShowUser;

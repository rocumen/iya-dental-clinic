import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate(-1); // Go back one step in the history
  };

  return (
    <Button variant="dark" className="text-light" onClick={goBackHandler}>
      <FaArrowLeft /> Go Back
    </Button>
  );
};

export default GoBackButton;

import React from "react";
import "./Button.css";

const Button = ({ onClick, textContent }) => {
  return (
    <button onClick={onClick} className="btn">
      {textContent}
    </button>
  );
};

export default Button;

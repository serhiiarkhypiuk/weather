import React from "react";

function Button({ className, btnText, onClick }) {
  return (
    <button onClick={onClick} className={className}>
      {btnText}
    </button>
  );
}

export default Button;

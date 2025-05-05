import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  label,
  iconUrl,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  navigateTo
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ContactUS"); // Always navigate to /contact
  };
  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none 
        ${backgroundColor ? `${backgroundColor} ${textColor} ${borderColor}` : "bg-coral-red text-white border-coral-red"}
        rounded-full ${fullWidth ? "w-full" : ""}`}
    >
      {label}
      {iconUrl && <img src={iconUrl} className="ml-2 rounded-full w-5 h-5" alt="icon" />}
    </button>
  );
};

export default Button;

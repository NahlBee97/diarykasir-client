import React from "react";

export const KeypadButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="
      flex items-center justify-center h-16 w-full rounded-xl 
      text-2xl font-black 
      border-2 border-black bg-white text-black 
      transition-all duration-200 
      hover:bg-black hover:text-white 
      active:scale-95
    "
  >
    {children}
  </button>
);

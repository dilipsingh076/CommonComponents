import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  disabled = false,
  error = false,
  onChange,
}) => {
  return (
    <>
      <label
        className={`relative flex items-center cursor-pointer w-6 h-6 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          disabled={disabled}
          onChange={() => !disabled && onChange(!checked)}
        />
        <div
          className={`w-6 h-6 flex items-center justify-center border-2 rounded transition-colors 
        ${disabled && !checked && "bg-borderLight !border-disabled text-textSecondary"}
          ${disabled && checked && "!bg-disabled !border-disabled text-borderDark hover:!bg-disabled"}
          ${ checked && error && "bg-danger border-danger text-white"} 
          ${ checked && !error && "bg-primary border-primary text-white"}
          ${ !checked && error && "border-danger text-danger"} 
          ${!checked && !error && "border-border"}
          ${ checked && !error && "hover:bg-secondary hover:border-secondary"}
        `}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </label>
    </>
  );
};

export default CustomCheckbox;

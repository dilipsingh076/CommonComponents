import React from "react";

type ButtonVariant = "filled" | "outline" | "text";
type ButtonSize = "small" | "medium" | "large" | "none";
type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
  buttonType?:ButtonType
}

const Button: React.FC<ButtonProps> = ({
  label,
  className = "",
  onClick,
  variant = "filled",
  size = "large",
  disabled = false,
  startIcon,
  endIcon,
  children,
  buttonType="button",
}) => {
  const baseStyle =
    "rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2";

  const variantStyles: Record<ButtonVariant, string> = {
    filled: "bg-primary text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    text: "bg-none text-primary hover:underline",
  };

  const disabledOutlineStyles = "opacity-50 cursor-not-allowed text-[#939DB0]";

  const disabledFilledStyles =
    "opacity-50 !bg-[#D0D0D0] border-none hover:bg-[#D0D0D0] cursor-not-allowed !text-[#939DB0]";

  const sizeStyles: Record<ButtonSize, string> = {
    small: "px-3 py-2 text-p",
    medium: "px-4 py-3 py-2 text-h6",
    large: "px-6 py-3.5 text-h6",
    none: ""
  };

  return (
    <button
      className={` flex items-center
    ${baseStyle}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? (variant === "outline" ? disabledOutlineStyles : disabledFilledStyles) : ""}
    ${className}
  `}
      onClick={onClick}
      disabled={disabled}
      type={buttonType}
    >
      {startIcon && <span>{startIcon}</span>}
      {children ? children : <span className="flex leading-4">{label}</span>}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default Button;

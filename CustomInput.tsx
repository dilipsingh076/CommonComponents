import React, {
  useState,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import Loading from "./Loading";

interface ClassName {
  container?: string;
  label?: string;
  icon?: string;
  input?: string;
  helperText?: string;
}

interface CustomInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "className"
  > {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  icon?: React.ReactElement | React.ComponentType<any>;
  helperText?: string;
  className?: ClassName;
  required?: boolean;
  isValidating?: boolean; // New prop to indicate validation state
  endIcon?: React.ReactElement | React.ComponentType<any>; // New prop for end icon
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  icon,
  helperText,
  className,
  required = false,
  isValidating = false, // Default to false
  endIcon,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === "password" && showPassword ? "text" : type;
  
  // Determine if we should show the left icon
  // Only show icon if there's no value or if specifically requested
  const showLeftIcon = icon && (!value || value.length === 0);
  
  // Determine if there's a validation error for required fields
  const requiredError = required && touched && value.trim() === "";
  const hasError = error || requiredError;
  
  const handleBlur = () => {
    setIsFocused(false);
    setTouched(true);
  };

  // Generate the icon class string
  const iconClassString = `h-4 w-4 ${
    hasError ? "text-red-500 " : disabled ? "text-gray-400 " : "text-border "
  }${className?.icon || ""}`;

  // Render the icon based on whether it's a React element or a component
  const renderIcon = () => {
    if (!icon){ return null;};

    // If icon is already a React element (JSX)
    if (React.isValidElement(icon)) {
      // Create a new element instead of cloning to avoid TypeScript issues
      return <span className={iconClassString}>{icon}</span>;
    }

    // If icon is a component type, render it with props
    const IconComponent = icon as React.ComponentType<any>;
    return <IconComponent className={iconClassString} />;
  };

  // Render end icon or the circular progress
  const renderEndIcon = () => {
    if (isValidating) {
      return (
        <div className='flex items-center justify-center'>
          {/* <CircularProgress className='h-5 w-5 text-blue-500' /> */}
          <Loading />
        </div>
      );
    }

    if (endIcon) {
      // Similar logic to renderIcon
      if (React.isValidElement(endIcon)) {
        return <span className={iconClassString}>{endIcon}</span>;
      }

      const EndIconComponent = endIcon as React.ComponentType<any>;
      return <EndIconComponent className={iconClassString} />;
    }

    return null;
  };

  return (
    <div className={`w-full text-xs ${className?.container || ""}`}>
      {label && (
        <label
          htmlFor={`input-${label.toLowerCase().replace(/\s+/g, "-")}`}
          className={`block mb-1 ${
            hasError
              ? "text-danger"
              : disabled
                ? "text-gray-400"
                : "text-textPrimary"
          }
          ${className?.label || ""}
          `}
        >
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className='relative'>
        {showLeftIcon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            {renderIcon()}
          </div>
        )}

        <input
          id={`input-${label?.toLowerCase().replace(/\s+/g, "-")}`}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          required={required}
          aria-required={required}
          aria-invalid={hasError ? "true" : "false"}
          className={`block w-full rounded-[10px] border border-borderDark hover:border-[#1C4CD3] ${
            hasError
              ? "border-danger focus:ring-danger focus:border-danger"
              : disabled
                ? "border-gray-200 bg-gray-100 text-gray-400"
                : isFocused
                  ? "border-[#1C4CD3] focus:ring-[#1C4CD3] focus:border-[#1C4CD3]"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          } p-2.5 ${showLeftIcon ? "pl-8" : "pl-3"} ${
            type === "password" || hasError || isValidating || endIcon
              ? "pr-10"
              : "pr-3"
          } shadow-sm focus:outline-none focus:ring-1 ${className?.input || ""}`}
          {...props}
        />

        <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
          {type === "password" && !hasError && !isValidating && (
            <button
              type='button'
              className={`${disabled ? "hidden" : ""}`}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5 text-border' />
              ) : (
                <Eye className='h-5 w-5 text-border' />
              )}
            </button>
          )}

          {hasError && type !== "password" && !isValidating && (
            <div className='pointer-events-none'>
              <AlertCircle className='h-5 w-5 text-danger' />
            </div>
          )}

          {(isValidating || (endIcon && !hasError && type !== "password")) && (
            <div className='pointer-events-none'>{renderEndIcon()}</div>
          )}
        </div>
      </div>

      {error && typeof error === "string" && (
        <p className='mt-1 text-caption text-danger'>{error}</p>
      )}

      {requiredError && !error && (
        <p className='mt-1 text-caption text-danger'>This field is required</p>
      )}

      {helperText && (
        <p
          className={`mt-1 text-caption text-danger ${className?.helperText || ""}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default CustomInput;

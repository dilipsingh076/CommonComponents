import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  name: string;
  options: SelectOption[] | string[];
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string | boolean;
  className?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  name,
  options = [],
  value,
  onChange,
  error,
  placeholder = "Select",
  className,
  required = false,
  icon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Format options to consistent object structure
  const formattedOptions: SelectOption[] = options.map(option => 
    typeof option === "string" ? { value: option, label: option } : option
  );
  
  // Find the selected option
  const selectedOption = formattedOptions.find(option => option.value === value);
  
  // Filter options based on search
  const filteredOptions = searchValue.trim() === "" 
    ? formattedOptions 
    : formattedOptions.filter(option => option.label.toLowerCase().includes(searchValue.toLowerCase()));

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: SelectOption) => {
    onChange(name, option.value);
    setSearchValue("");
    setIsOpen(false);
    setTouched(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // Determine if there"s a validation error
  const requiredError = required && touched && !value;
  const hasError = error || requiredError;

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={`select-${name}`}
          className={`block mb-1 text-small  ${
            hasError ? "text-danger" : "text-textPrimary"
          }`}
        >
          {label}
          {required && <span className="text-textPrimary">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className={`flex items-center h-10 justify-between w-full rounded-md border ${
            hasError ? "border-danger" : isOpen ? "border-secondary ring-1 ring-blue-500" : "border-gray-300"
          } bg-white p-2.5 cursor-pointer`}
        >
          <div className="flex items-center w-full">
            {icon && <span className="mr-2 ">{icon}</span>}
            
            <input
              type="text"
              placeholder={placeholder}
              value={isOpen ? searchValue : selectedOption?.label || ""}
              onChange={handleInputChange}
              onClick={(e) => e.stopPropagation()}
              onFocus={() => setIsOpen(true)}
              className="w-full bg-transparent border-none text-p text-border focus:outline-none"
            />
          </div>
          
          <ChevronDown className={`h-5 w-5 text-border transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </div>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
            <ul className="max-h-60 overflow-auto m-0 py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li 
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className={`px-3 py-2 hover:bg-tertiary text-p cursor-pointer flex items-center justify-between ${
                      option.value === value ? "bg-tertiary text-secondary" : ""
                    }`}
                  >
                    {option.label}
                    {option.value === value && <Check className="h-4 w-4 text-tertiary" />}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No options found</li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      {error && typeof error === "string" && (
        <p className="mt-1 text-caption text-danger">{error}</p>
      )}
      
      {requiredError && !error && (
        <p className="mt-1 text-caption text-danger">This field is required</p>
      )}
    </div>
  );
};

export default CustomSelect;
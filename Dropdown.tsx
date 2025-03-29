import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownItem {
  id?: string;
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

interface DropdownProps {
  name: string;
  items: DropdownItem[];
  showIcon?: boolean;
  isDisabled?: boolean;
  onSelect?: (item: DropdownItem) => void;
  avatarSrc?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  items,
  showIcon = true,
  isDisabled = false,
  onSelect,
  avatarSrc,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onSelect) {
      onSelect(item);
    }
    setIsOpen(false);
  };

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

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div
        onClick={toggleDropdown}
        className={`
          flex items-center cursor-pointer select-none
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {avatarSrc ? (
          <img src={avatarSrc} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
        ) : (
          <Avatar name={name} className="w-8 h-8 text-gray-500 mr-2"  />
        )}
        <span className="text-textPrimary text-h6 font-medium">{name}</span>
        <span className={`ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          {isOpen ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-2 right-[-50px] w-[174px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="pt-4 pb-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center h-10 px-6 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {showIcon && item.icon && <div className="mr-2">{item.icon}</div>}
                <span className="text-p font-normal">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
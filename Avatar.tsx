import React from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  className = ""
}) => {
  // Get first letter of name
  const firstLetter = name.charAt(0).toUpperCase();
  
  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl"
  };
  
  // Background colors for letter avatars (based on first letter)
  const getBackgroundColor = (letter: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-yellow-100 text-yellow-600",
      "bg-red-100 text-red-600",
      "bg-indigo-100 text-indigo-600",
      "bg-pink-100 text-pink-600",
      "bg-teal-100 text-teal-600"
    ];
    
    // Get a consistent color based on the letter
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };
  
  return (
    <div className={`rounded-full overflow-hidden flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className={`w-full h-full flex items-center justify-center font-medium ${getBackgroundColor(firstLetter)}`}>
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default Avatar;
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
  speedMs?: number;
  variant?: "spin" | "pulse" | "dots";
}

interface LoadingProps {
    className?: string
    loadingText?: string;
    loadingTextClass?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = "#C1C5CD", 
  className = "",
  speedMs = 750,
  variant = "spin",
}) => {

  return (
    <Loader2
      className={`animate-spin ${className}`}
      size={size}
      color={color}
      style={{
        animationDuration: `${speedMs}ms`,
      }}
    />
  );
};

const Loading = ({ className, loadingText, loadingTextClass }: LoadingProps) => {
  return (
    <div className={`'flex flex-col items-center space-y-2' ${className}`}>
      <LoadingSpinner size={24} />
      {loadingText && <span className={loadingTextClass}>Default</span>}
    </div>
  );
};

export default Loading;

import React from "react";
import Typography from "./Typography";

// Define the interfaces for props and context states
interface BreadcrumbProps {
  category?: string; 
  week?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, week }) => {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-[10px] text-xs text-gray-600 [&_a:last-child]:text-black-500">
      {/* Base breadcrumb */}
      <Typography variant="p" color="primary" className="font-bold uppercase">
        {category}
      </Typography>
      <button className="w-1 h-1 rounded-[40px] opacity-[50%] transition-all bg-primary" />
      <Typography variant="p" color="primary" className="font-bold uppercase">
        {week}
      </Typography>
    </nav>
  );
};

export default Breadcrumb;
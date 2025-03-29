import React from "react";
import TrophyIcon from "../../images/TrophyIcon";
import Typography from "./Typography";

interface ProgressBarProps {
  progress: number;
  className?: string;
  textClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className, textClass }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center w-28 h-2 bg-gray-200 rounded-full">
        <div
          className='h-2 bg-blue-600 rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
        <TrophyIcon
          width={18}
          height={18}
          fillColor={progress === 100 ? "#E49D24" : "white"}
          className='absolute top-[3px] bottom-[10px] mb-[6px] transform -translate-y-1/2'
          style={{ 
            left: "102px", 
            transition: "left 0.3s ease" 
          }}
        />
      </div>
      <div className='flex items-center gap-6 ml-4'>
        <Typography variant="h6" className={`'text-textPrimary font-normal' ${textClass}`}>
          {progress}% complete
        </Typography>
      </div>
    </div>
  );
};

export default ProgressBar;

import React, { useState } from "react";

const myTabs = [
  { label: "For you", count: 12 },
  { label: "Beginner", count: 13 },
  { label: "Intermediate", count: 2 },
  { label: "Advanced", count: 5 }
];

export interface Tab {
  label: string;
  count: number;
}

interface CustomTabsProps {
  tabs?: Tab[];
  defaultActiveIndex?: number;
  activeBgColor?: string;
  activeTextColor?: string;
  className?: string;
  tabClsaaName?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs = myTabs,
  defaultActiveIndex = 0,
  activeBgColor = "bg-blue-600",
  activeTextColor = "text-white",
  className,
  tabClsaaName
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultActiveIndex);

  return (
    <div className={`w-fit rounded-lg ${className}`}>
      <div className={`flex flex-row items-center rounded-lg h-11 w-[725px] bg-white ${tabClsaaName}`}>
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <div 
              className="flex flex-1 cursor-pointer items-center" 
              onClick={() => setActiveTabIndex(index)}
            >
              <div
                className={`flex w-full items-center justify-between rounded-lg px-5 py-2 ${
                  activeTabIndex === index ? `${activeBgColor} ${activeTextColor}` : ""
                }`}
              >
                <span className="text-h6 font-medium">{tab.label}</span>
                <span className={`ml-2 px-[6px] py-[2px] flex items-center justify-center rounded-xl ${
                  activeTabIndex === index ? "bg-background text-textPrimary" : "bg-[#EEF6FD]"
                }`}>
                  {tab.count}
                </span>
              </div>
            </div>
            {index < tabs.length - 1 && (
              <div className="h-5 w-px bg-borderDark"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CustomTabs;
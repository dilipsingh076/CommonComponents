import React from "react";
import clsx from "clsx";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  thickness?: string;
  color?: string;
  text?: string;
  textPosition?: "left" | "center" | "right";
  className?: string;
};

const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  thickness = "1px",
  color = "bg-[#f0f0f0]",
  text,
  textPosition = "center",
  className,
}) => {
  return orientation === "horizontal" ? (
    <div className={clsx("relative flex items-center w-full", className)}>
      <div className={clsx("flex-grow", color)} style={{ height: thickness }} />
      {text && (
        <span
          className={clsx(
            "px-2 text-sm text-gray-600",
            textPosition === "left" && "ml-2",
            textPosition === "right" && "mr-2"
          )}
        >
          {text}
        </span>
      )}
      <div className={clsx("flex-grow", color)} style={{ height: thickness }} />
    </div>
  ) : (
    <div className={clsx("flex h-full items-center", className)}>
      <div className={clsx(color)} style={{ width: thickness, height: "100%" }} />
    </div>
  );
};

export default Divider;

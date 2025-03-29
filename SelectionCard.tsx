import React from "react";
import CustomCheckbox from "./CustomCheckbox";
import CheckRoundIcon from "../../images/CheckRoundIcon";
import CloseButtonIcon from "../../images/CloseButtonIcon";

interface SelectableCardProps {
  type: "default" | "check"; // "default" for no checkbox, "check" for checkbox
  label: string;
  imageSrc?: string;
  checked?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
//   eslint-disable-next-line no-unused-vars
  onChange?: (checked: boolean) => void;
  onClick?: () => void;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  type,
  label,
  imageSrc,
  checked = false,
  correct = false,
  incorrect = false,
  disabled = false,
  onChange,
  onClick,
}) => {
  let borderColor = "border-border";
  let bgColor = "bg-white";
  let textColor = "text-textPrimary";
  let icon = null;

  console.log("check correct and incorrect", correct, incorrect);
  if (correct) {
    borderColor = "border-success";
    bgColor = "bg-success/10";
    textColor = "text-success";
    icon = <CheckRoundIcon className=" w-6 h-6" />; // Placeholder for check icon
  } else if (incorrect) {
    borderColor = "border-danger";
    bgColor = "bg-danger/10";
    textColor = "text-danger";
    icon = <CloseButtonIcon className="w-6 h-6" />; // Placeholder for error icon
  } else if (checked) {
    borderColor = "border-primary";
  }
  if (disabled) {
    borderColor = "border-disabled";
    textColor = "text-textSecondary";
    icon = <CheckRoundIcon className="[&_path]:fill-border w-6 h-6" />;
  }

  return (
    <button
      className={`relative   flex  items-center border-2 ${borderColor} ${bgColor} rounded-lg  shadow-sm transition-all 
       ${imageSrc ? "flex-col items-center justify-center w-fit min-w-72 px-10 py-10" : "flex-row w-full px-8 py-[26px] justify-between"}
       ${!disabled ? "hover:border-secondary" : "opacity-50 cursor-not-allowed"}
      `}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {!imageSrc && type === "check" && onChange && (
        <div className="">
          <CustomCheckbox
            checked={checked}
            disabled={disabled}
            onChange={onChange}
          />
        </div>
      )}

      {imageSrc && (
        <img src={imageSrc} alt={label} className="w-[88px] h-[88px] mb-10" />
      )}
      <span className={`text-sm font-medium ${textColor}`}>{label}</span>

      <span>
        {icon && imageSrc && (
          <span className="absolute top-6 right-6">{icon}</span>
        )}
        {icon && !imageSrc && <span className="">{icon}</span>}
      </span>
    </button>
  );
};

export default SelectableCard;





//  uses of selection card

// import { useState } from "react";
// import demomap from "../../images/demomap.png";
// import SelectableCard from "../common/SelectionCard";
// const [selectedCard, setSelectedCard] = useState<string | null>(null);
// const [isChecked, setIsChecked] = useState(false);

{/* <div className="grid grid-cols-2 gap-4 my-5 flex-wrap">
<SelectableCard
  type="check"
  label="Google Maps"
  checked={isChecked}
  onChange={setIsChecked}
/>

<SelectableCard
  type="default"
  correct
  label="Growth in computing power"
  onClick={() => setSelectedCard("growth")}
/>

<SelectableCard
  type="default"
  incorrect
  label="Growth in computing power"
  onClick={() => setSelectedCard("growth")}
/>

<SelectableCard
  type="default"
  disabled
  label="Growth in computing power"
  onClick={() => setSelectedCard("growth")}
/>

<SelectableCard
  imageSrc={demomap}
  type="check"
  label="Select this option"
  checked={isChecked}
  onChange={setIsChecked}
/>

<SelectableCard
  imageSrc={demomap}
  type="default"
  label="Correct Answer"
  correct
/>

<SelectableCard
  type="default"
  imageSrc={demomap}
  label="Incorrect Answer"
  incorrect
/>

<SelectableCard
  type="default"
  imageSrc={demomap}
  label="Disabled Option"
  disabled
/>
</div> */}


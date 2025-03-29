import React from "react";
import Avatar from "./Avatar"; // Your custom Avatar component
import Typography from "./Typography";

interface UserListingProps {
  id: string;
  name: string;
  xp: number;
  avatarSrc?: string;
  isHighlighted?: boolean;
  selected?: boolean;
  rank?: number;
}

const UserListing: React.FC<UserListingProps> = ({
  name,
  xp,
  avatarSrc,
  selected,
  rank,
}) => {
  return (
    <div
      className={`flex justify-between items-center py-2 px-4 rounded-xl cursor-pointer
        ${selected ? "bg-[#EEF6FD] font-semibold border-[#E1F1FF] text-textPrimary" : "text-border"}`} // Highlight top 3 users
    >
      <span className="font-medium w-10">{rank !== undefined ? `${rank}` : "-"}</span>
      <div className="flex gap-4 justify-center items-center">
        <Avatar src={avatarSrc} name={name} size="md" />
        <Typography variant="h6" className="flex-1 min-w-[136px] font-medium" color="none">{name}</Typography>
      </div>
      <Typography variant="h6" weight="semibold" color="none">{xp} xp</Typography>
    </div>
  );
};

export default UserListing;
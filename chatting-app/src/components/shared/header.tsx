import { Camera, EllipsisVertical } from "lucide-react";
import LogoutButton from "../buttons/logout-button";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-3xl font-extrabold">Chat</h1>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <LogoutButton />
          <Camera className="cursor-pointer" />
          <EllipsisVertical className="cursor-pointer" />
        </div>
      </header>
    </>
  );
};

export default Header;

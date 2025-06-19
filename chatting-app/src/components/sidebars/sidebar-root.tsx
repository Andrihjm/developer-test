import { NavLink } from "react-router-dom";
import {
  sidebar_constant,
  user_settings,
} from "../../constants/footer.constant";

const SidebarRoot = () => {
  return (
    <>
      <div className="flex h-screen w-[65px] flex-col justify-between border-r border-[#242626] bg-[#1D1F1F] p-4">
        <div className="flex flex-col items-center gap-1">
          {sidebar_constant.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `cursor-pointerl flex items-center gap-1 p-2.5 ${
                  isActive
                    ? "rounded-full bg-[#292A2A] text-[#FAFAFA]"
                    : "text-[#A5A5A5]"
                }`
              }
            >
              <item.icon size={20} />
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1">
          {user_settings.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              className={({ isActive }) =>
                `cursor-pointerl flex items-center gap-1 p-2.5 ${
                  isActive
                    ? "rounded-full bg-[#292A2A] text-[#FAFAFA]"
                    : "text-[#A5A5A5]"
                }`
              }
            >
              <item.icon size={20} />
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default SidebarRoot;

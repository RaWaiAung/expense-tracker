import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { SIDE_MENU_DATA } from "../utils/data";
import Avatar from "./Avatar";

const SideMenu = ({ activeMenu }: {
  activeMenu?: string;
}) => {
  const navigate = useNavigate();

  const handleClick = (route: string) => {
    if (route === "logout") {
      handleLogout();
      return;
    } else {
      navigate(`/${route}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    removeUser();
    navigate("/login");
  };

  const { user, removeUser } = useUser();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-2">{
        user?.profileImageUrl ? (
          <img src={user.profileImageUrl || ""} alt="Profile Image" className="w-20 h-20 bg-slate-400 rounded-full" />) : <>
          <Avatar
            fullName="Ra Wai"
            width="w-20"
            height="h-20"
            style="text-xl" />
        </>
      }
        <h5 className="text-gray-950 font-medium leading-6">
          {
            user ? user.fullName : ""
          }
        </h5>
      </div>
      {
        SIDE_MENU_DATA.map((menu) => (
          <div
            key={menu.id}
            className={`
        w-full flex items-center gap-4 px-6 py-3 cursor-pointer text-[15px] rounded-lg mb-3
        ${activeMenu == menu.name ? 'bg-primary text-white' : 'font-normal'}
      `}
            onClick={() => handleClick(menu.link.replace("/", ""))}
          >
            <menu.icon className="text-xl" />
            <span>{menu.name}</span>
          </div>
        ))
      }
    </div>
  )
}

export default SideMenu
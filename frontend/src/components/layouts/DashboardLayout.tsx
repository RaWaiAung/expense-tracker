import Navbar from "../../ui/Navbar";
import SideMenu from "../../ui/SideMenu";

const DashboardLayout = ({ children, activeMenu }: {
  children: React.ReactNode;
  activeMenu: string;
}) => {

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">
          {
            children
          }
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;
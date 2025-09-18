import dashboardIcon from "../assets/dashboards.png";
import graduationIcon from "../assets/graduation.png";
import groupIcon from "../assets/group.png";
import libraryIcon from "../assets/library.png";
import logo from "../assets/logo1.png";
import qrcodeIcon from "../assets/qr-code.png";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: "dashboard", icon: dashboardIcon, label: "Dashboard" },
    { id: "bookshelf", icon: libraryIcon, label: "Bookshelf" },
    { id: "students", icon: graduationIcon, label: "Students" },
    { id: "librarian", icon: groupIcon, label: "Librarian" },
    { id: "qrcode", icon: qrcodeIcon, label: "QR-code" },
  ];

  return (
    /* SideBar */
    <div
      className="bg-teal-800 text-white flex sm:flex-col sm:w-40 h-45 sm:h-screen w-full fixed sm:relative bottom-0 sm:top-0 z-50"
      style={{
        boxShadow: "8px 0 15px rgba(0, 0, 0, 0.4)", // right-side shadow
      }}
    >
      {/* Menu */}
      <div className="flex sm:flex-col justify-around sm:justify-start items-center w-full sm:mt-0 sm:flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center justify-center sm:w-full sm:m-2 p-3 transition
              ${
                activePage === item.id
                  ? "bg-teal-600 sm:border-l-6 sm:border-orange-500 text-white"
                  : "hover:bg-teal-700"
              }
            `}
          >
            <img
              src={item.icon}
              alt={item.id}
              className="w-6 h-6 sm:w-8 sm:h-8 filter invert brightness-0 saturate-100"
            />
            <span className="hidden sm:block text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Bottom Logo */}
      <div className="flex flex-col items-center justify-center border-t-1 border-white h-50">
        <img src={logo} alt="Logo" className="w-35 h-35 invert" />
      </div>
    </div>
  );
};

export default Sidebar;

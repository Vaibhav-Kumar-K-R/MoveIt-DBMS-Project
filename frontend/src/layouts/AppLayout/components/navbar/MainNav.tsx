import { NavLink, NavLinkRenderProps } from "react-router-dom";

const MainNav = () => {
  const navStyles = ({ isActive }: NavLinkRenderProps) => {
    if (isActive) {
      return "py-1 px-4 rounded-full bg-zinc-800 text-zinc-100 transition-all duration-300";
    }

    return "py-1 px-4 rounded-full text-zinc-800 transition-all duration-300";
  };

  return (
    <div className="hidden md:block">
      <ul className="flex gap-2 transition-all duration-300">
        <li>
          <NavLink to={"/"} className={navStyles}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/services"} className={navStyles}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to={"/products"} className={navStyles}>
            Products
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"} className={navStyles}>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainNav;

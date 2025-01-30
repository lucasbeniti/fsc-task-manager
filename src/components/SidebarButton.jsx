import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, to }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 px-6 py-3",
    variants: {
      color: {
        selected: "bg-[#E6F7F8] text-brand-primary",
        unselected: "text-brand-dark-blue",
      },
    },
  });

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarButton;

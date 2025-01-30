import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const SidebarButton = ({ children, variant, href }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 px-6 py-3",
    variants: {
      colors: {
        selected: "bg-[#E6F7F8] text-brand-primary",
        unselected: "text-brand-dark-blue",
      },
    },
  });

  return (
    <a href={href} className={sidebar({ colors: variant })}>
      {children}
    </a>
  );
};

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["selected", "unselected"]).isRequired,
};

export default SidebarButton;

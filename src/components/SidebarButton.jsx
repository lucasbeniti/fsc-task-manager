import { tv } from "tailwind-variants";

const SidebarButton = ({ children, variant }) => {
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
    <a href="#" className={sidebar({ colors: variant })}>
      {children}
    </a>
  );
};

export default SidebarButton;

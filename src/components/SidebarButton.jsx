const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "selected") {
      return "bg-[#E6F7F8] text-brand-primary";
    }
    if (variant === "unselected") {
      return "text-brand-dark-blue";
    }
  };
  return (
    <a
      href="#"
      className={`flex items-center gap-2 px-6 py-3 ${getVariantClasses()}'}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;

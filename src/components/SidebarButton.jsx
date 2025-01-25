// eslint-disable-next-line react/prop-types
const SidebarButton = ({ children, variant }) => {
  return (
    <a
      href="#"
      className={`px-6 py-3 ${variant === 'unselected' ? 'text-[#35383E]' : 'bg-[#E6F7F8] text-[#00ADB5]'}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;

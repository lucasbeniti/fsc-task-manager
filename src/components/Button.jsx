const Button = ({ children, variant = "primary", size = "sm", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-brand-primary text-white";
    }
    if (variant === "ghost") {
      return "bg-transparent text-brand-dark-gray";
    }
    if (variant == "secondary") {
      return "bg-brand-light-gray text-brand-dark-blue";
    }
  };

  const getSizesClasses = () => {
    if (size === "sm") {
      return "py-1 text-xs";
    }

    if (size === "lg") {
      return "py-2 text-sm w-full justify-center";
    }
  };

  return (
    <button
      className={`flex items-center gap-1 rounded-md px-3 font-semibold ${getVariantClasses()} transition-all hover:opacity-85 ${getSizesClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

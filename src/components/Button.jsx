const Button = ({ children, variant = "primary", size = "sm", ...rest }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }
    if (variant == "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
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

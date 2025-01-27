import { tv } from "tailwind-variants";

const Button = ({ children, variant = "primary", size = "sm", ...rest }) => {
  const button = tv({
    base: "flex items-center gap-1 rounded-md px-3 font-semibold transition-all hover:opacity-85",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
      },
      size: {
        sm: "py-1 text-xs",
        lg: "w-full justify-center py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "priamry",
      size: "small",
    },
  });

  return (
    <button className={button({ color: variant, size: size })} {...rest}>
      {children}
    </button>
  );
};

export default Button;

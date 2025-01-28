import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Button = ({
  children,
  variant = "primary",
  size = "sm",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex items-center gap-1 rounded-md px-3 font-semibold transition-all hover:opacity-85",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "bg-transparent text-brand-dark-gray",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        danger: "bg-brand-danger text-white",
      },
      size: {
        sm: "py-1 text-xs",
        lg: "w-full justify-center py-2 text-sm",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:opacity-50",
      },
    },
    defaultVariants: {
      color: "priamry",
      size: "small",
    },
  });

  return (
    <button
      className={button({
        color: variant,
        size: size,
        disabled: rest.disabled,
        className,
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "ghost", "secondary"]),
  size: PropTypes.oneOf(["sm", "lg"]),
};

export default Button;

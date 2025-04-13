import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  size: "sm" | "md" | "lg";
  text?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const varientStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-100 text-purple-600",
  danger: "bg-red-600 bg-opacity-20 text-red-500",
};

const sizeStyles = {
  sm: "text-xl py-1 px-2",
  md: "text-2xl py-2 px-4",
  lg: "text-3xl py-3 px-6",
};

const defaultStyles = "rounded-md flex justify-center items-center gap-2";

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${defaultStyles} ${varientStyles[props.variant]} ${
        sizeStyles[props.size]
      }`}
    >
      <div className="flex justify-center items-center pr-2 pl-3">
        {props?.startIcon}
      </div>
      {props.text}
      <div className="flex justify-center items-center pl-2 pr-3">
        {props?.endIcon}
      </div>
    </button>
  );
};

export default Button;
// varient size onclick

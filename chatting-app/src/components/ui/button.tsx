interface ButtonProps {
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  children,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-md px-4 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

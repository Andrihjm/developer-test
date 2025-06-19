import Button from "../ui/button";

interface SubmitButtonProps {
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  type,
  onClick,
  disabled,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-600 ${className}`}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;

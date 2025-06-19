interface SeparatorProps {
  className?: string;
}

const Separator = ({ className }: SeparatorProps) => {
  return <div className={`h-[1px] w-full bg-gray-200 ${className}`} />;
};

export default Separator;

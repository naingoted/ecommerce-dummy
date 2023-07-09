import { MouseEventHandler, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  name,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      role="button"
      aria-label={name}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;

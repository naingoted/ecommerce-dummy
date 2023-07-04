import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LoadingSpinner = ({ size = 15, className, ...props }: Props) => (
  <div className={cn("flex justify-center items-center", className)}>
    <div className="animate-spin">
      <Loader2 size={size} className="text-blue-500 h-5 w-5" />
    </div>
  </div>
);

export default LoadingSpinner;

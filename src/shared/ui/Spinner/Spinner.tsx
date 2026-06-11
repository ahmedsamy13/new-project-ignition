import { Loader2 } from "lucide-react";
import { cn } from "@/shared/utils";

interface SpinnerProps {
  className?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className, fullScreen, size = "md" }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const spinner = <Loader2 className={cn("animate-spin text-blue-600", sizes[size], className)} />;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}

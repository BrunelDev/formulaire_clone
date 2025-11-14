import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const PrimaryButton = ({
  className,
  handleClick,
  disabled,
  isLoading = false,
  type,
}: {
  className?: string;
  handleClick?: () => void | Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}) => {
  const [animationClass, setAnimationClass] = useState("");

  const handleMouseEnter = () => {
    setAnimationClass("animate-hover-bounce");
  };

  const handleMouseLeave = () => {
    setAnimationClass("animate-hover-bounce-reverse");
  };

  return (
    <Button
      className={cn(
        "h-auto px-3 sm:px-4 py-2 sm:py-3 bg-syracuse_red_orange text-white font-label-medium font-[number:var(--label-medium-font-weight)] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] whitespace-nowrap [--animation-delay:0ms] cursor-pointer",
        className
      )}
      onClick={async () => {
        if (handleClick) {
          if (handleClick.constructor.name === "AsyncFunction") {
            await handleClick();
          } else handleClick();
        }
      }}
      disabled={disabled || isLoading}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type={type || "button"}
    >
      <div className={cn("flex items-center gap-2", animationClass)}>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        Étape suivante
      </div>
    </Button>
  );
};

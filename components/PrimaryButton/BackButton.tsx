import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

export default function BackButton({
  handleClick,
  //disabled,
  className,
}: {
  handleClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  const [animationClass, setAnimationClass] = useState("");
  

  const handleMouseEnter = () => {
    setAnimationClass("animate-hover-bounce");
  };

  const handleMouseLeave = () => {
    setAnimationClass("animate-hover-bounce-reverse");
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto px-3 sm:px-4 py-2 sm:py-3  bg-[#f7f7f8] font-label-medium font-[number:var(--label-medium-font-weight)] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] whitespace-nowrap [--animation-delay:0ms] text-[#6D7074] border border-[#B8B9C1] shadow-none cursor-pointer",
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={animationClass + " text-[#6D7074]"}>
        Étape précédente</div>
    </Button>
  );
}

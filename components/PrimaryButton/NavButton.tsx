import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export const NavButton = () => {
  const [animationClass, setAnimationClass] = useState("");

  const handleMouseEnter = () => {
    setAnimationClass("animate-hover-bounce");
  };

  const handleMouseLeave = () => {
    setAnimationClass("animate-hover-bounce-reverse");
  };

  return (
    <Link href={"https://formulaire.mesplansdepermis.fr/"}>
      <Button
        className={
          "min-h-[38.4px] px-4 sm:px-5 py-2 sm:py-3 text-white font-label-medium font-[number:var(--label-medium-font-weight)] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] whitespace-nowrap [--animation-delay:0ms] cursor-pointer bg-oxford_blue  hover:bg-syracuse_red_orange w-full"
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={animationClass}>J&apos;obtiens mon devis</div>
      </Button>
    </Link>
  );
};

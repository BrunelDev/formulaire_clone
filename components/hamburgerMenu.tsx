"use client";

export default function HamburgerMenu({
  action,
  setIsOpenAction,
  isOpen,
}: {
  action: () => void;
  setIsOpenAction: (isOpen: boolean) => void;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={() => {
        setIsOpenAction(!isOpen);
        action();
      }}
      className="relative flex h-12 w-12 flex-col items-start justify-center gap-1.5 rounded-md pl-3 z-[9999999999]"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={`h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-4 bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out ${
          isOpen ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </button>
  );
}

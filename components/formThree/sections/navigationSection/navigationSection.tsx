import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const navigationItems = [
  { label: "Accueil", href: "#" },
  { label: "Comment ça marche", href: "#" },
  { label: "Nos offres", href: "#" },
  { label: "Contact", href: "#" },
];

export const NavigationSection = () => {
  return (
    <header className="flex flex-col w-full items-start px-24 py-4 bg-app-background border-b border-[#f7f7f8] translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex items-center justify-between w-full">
        <Image
          width={129.73}
          height={36}
          className="w-[129.73px] h-9 object-cover translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
          alt="Whatsapp image"
          src="https://c.animaapp.com/mf2gfnauygUKoU/img/whatsapp-image-2025-08-22-at-13-42-48.png"
        />

        <NavigationMenu className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <NavigationMenuList className="flex items-center gap-10">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink
                  href={item.href}
                  className="inline-flex items-center justify-center gap-2.5 font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)] whitespace-nowrap hover:text-button-color transition-colors duration-200"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { default as Link } from "next/link";
import { useEffect, useState } from "react";
import HamburgerMenu from "./hamburgerMenu";
import { NavButton } from "./PrimaryButton/NavButton";
import { Button } from "./ui/button";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOffres, setShowOffres] = useState(false);

  const [animationClass, setAnimationClass] = useState("");

  const handleMouseEnter = () => {
    setAnimationClass("animate-hover-bounce");
  };

  const handleMouseLeave = () => {
    setAnimationClass("animate-hover-bounce-reverse");
  };

  const navigationItems = [
    {
      titre: "Accueil",
      href: "https://mesplansdepermis.fr/",
      description: "L'accueil est la page d'accueil de votre site web.",
    },
    {
      titre: "Comment ça marche ?",
      href: "https://mesplansdepermis.fr/processus/",
      description:
        "Comment ça marche est la page de comment ça marche de votre site web.",
    },
    {
      titre: "Nos offres",
      href: "https://mesplansdepermis.fr/nos-offres/",
      description: "Nos offres est la page de nos offres de votre site web.",
      hasSubmenu: true,
    },
    {
      titre: "Contact",
      href: "https://mesplansdepermis.fr/devis/",
      description: "Contact est la page de contact de votre site web.",
    },
  ];

  const nosOffres = [
    {
      label: "Permis de construire",
      href: "https://mesplansdepermis.fr/permisdeconstruire/",
    },
    {
      label: "Déclaration préalable",
      href: "https://mesplansdepermis.fr/declaration-prealable-de-travaux/",
    },
    {
      label: "Service à l'unité",
      href: "https://mesplansdepermis.fr/service/",
    },
    {
      label: "Dossier E.R.P",
      href: "https://mesplansdepermis.fr/erp/",
    },
  ];
  const [, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll vers le bas - masquer
        setIsVisible(false);
      } else {
        // Scroll vers le haut - afficher
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`w-full flex items-center justify-center bg-white [border-bottom-style:solid] h-[76px] relative z-50`}
      >
        <div className="flex flex-col w-full lg:w-[77%] items-center justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-between relative w-full">
            <Link href="https://mesplansdepermis.fr">
              <Image
                className="relative hidden lg:block w-[100px] sm:w-[120px] lg:w-[127px] h-7 sm:h-8 lg:h-[35px] object-cover"
                width={129.73}
                height={36}
                alt="Logo image"
                src={"/images/logo.jpg"}
              />
            </Link>
            <Image
              className="lg:hidden object-cover absolute left-1/2 -translate-x-1/2"
              width={33}
              height={35}
              alt="Logo image"
              onClick={() => {
                window.location.href = "https://mesplansdepermis.fr";
              }}
              src={"/images/logoNoText.jpg"}
            />

            <div className="items-center gap-4 lg:gap-10 relative flex-[0_0_auto] hidden lg:inline-flex">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-row gap-10">
                  {navigationItems.map((component) =>
                    component.titre !== "Nos offres" ? (
                      <NavigationMenuItem key={component.titre}>
                        <Link
                          href={component.href}
                          className="text-oxford_blue transition-colors duration-100 hover:text-syracuse_red_orange font-medium"
                        >
                          {component.titre}
                        </Link>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem
                        key={component.titre}
                        className="relative"
                      >
                        <NavigationMenuTrigger>
                          <Link
                            href={"https://mesplansdepermis.fr/nos-offres/"}
                            className="text-oxford_blue transition-colors duration-100 hover:text-syracuse_red_orange font-medium"
                          >
                            Nos offres
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[300px] gap-4 p-4">
                            {nosOffres.map((offre) => (
                              <li key={offre.label}>
                                <NavigationMenuLink href={offre.href}>
                                  <h6 className="text-sm transition-colors duration-100 hover:text-syracuse_red_orange">
                                    {offre.label}
                                  </h6>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  )}
                </NavigationMenuList>
              </NavigationMenu>
              <NavButton />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden ml-auto">
              <HamburgerMenu
                isOpen={isMobileMenuOpen}
                setIsOpenAction={setIsMobileMenuOpen}
                action={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu fullscreen */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-full bg-white z-0 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } px-8 pt-3`}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between">
            <Image
              className="object-cover"
              width={28.5}
              height={35}
              alt="Logo"
              src="/images/logoNoText.jpg"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-700 hover:text-gray-900"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 overflow-y-auto py-8">
            <div className="flex flex-col gap-6">
              {navigationItems.map((item) => (
                <div key={item.titre}>
                  {item.hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => setShowOffres(!showOffres)}
                        className="w-full flex items-center justify-between text-lg "
                      >
                        <Link
                          href={"https://mesplansdepermis.fr/nos-offres/"}
                          className="text-oxford_blue hover:text-syracuse_red_orange transition-colors duration-200 font-medium"
                        >
                          {item.titre}
                        </Link>
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-200 ${
                            showOffres ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      {showOffres && (
                        <div className="bg-gray-50 py-2">
                          {nosOffres.map((offre) => (
                            <Link
                              key={offre.label}
                              href={offre.href}
                              className="block px-10 py-3 text-base text-gray-700 hover:text-syracuse_red_orange transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {offre.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-lg font-medium hover:text-syracuse_red_orange text-oxford_blue transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.titre}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Bottom CTA button */}
          <div className="w-full py-6 px-4 h-[47px] mb-18">
            <Link href={"https://formulaire.mesplansdepermis.fr/"}>
              <Button
                className={
                  "min-h-[47px] h-full px-4 sm:px-5 py-2 sm:py-3 text-white font-label-medium font-[number:var(--label-medium-font-weight)] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] whitespace-nowrap [--animation-delay:0ms] cursor-pointer bg-oxford_blue  hover:bg-syracuse_red_orange w-full"
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={animationClass}>J&apos;obtiens mon devis</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

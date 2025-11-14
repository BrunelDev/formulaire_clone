import Image from "next/image";
import { JSX } from "react";
import { IconProp } from "../IconStep/IconStep";

export const FormStep = ({
  label,
  status = "active",
}: {
  label: IconProp;
  status: "inactive" | "active";
}): JSX.Element => {
  let iconSrc = "";
  if (label === IconProp.Location) {
    iconSrc =
      status === "active"
        ? "/icons/localisation.svg"
        : "/images/localisation-inactive.svg";
  } else if (label === IconProp.Estimation) {
    iconSrc =
      status === "active"
        ? "/images/estimation.svg"
        : "/images/estimation-inactive.svg";
  } else if (label === IconProp.Projets) {
    iconSrc =
      status === "active"
        ? "/images/projets.svg"
        : "/images/projets-inactive.svg";
  } else if (label === IconProp.Details) {
    iconSrc =
      status === "active"
        ? "/images/details.svg"
        : "/images/details-inactive.svg";
  } else if (label === IconProp.Coordonnees) {
    iconSrc =
      status === "active"
        ? "/images/coordonnees.svg"
        : "/images/coordonnees-inactive.svg";
  } else if (label === IconProp.Finalisation) {
    iconSrc =
      status === "active"
        ? "/images/finalisation.svg"
        : "/images/finalisation-inactive.svg";
  }
  return (
    <div
      className={`flex flex-col w-8 h-8 items-center justify-center gap-2.5 relative ${
        status === "active" ? "bg-syracuse_red_orange" : ""
      }  rounded-[1000px] border border-solid border-[#b8b9c1]`}
    >
      <Image src={iconSrc} alt="Icon" width={20} height={20} />
      <div
        className={`absolute top-[35px] -left-4 opacity-60 font-text-smaller font-[number:var(--text-smaller-font-weight)] text-[#021327] text-[length:var(--text-smaller-font-size)] text-center tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] whitespace-nowrap [font-style:var(--text-smaller-font-style)] `}
      >
        {label}
      </div>
    </div>
  );
};

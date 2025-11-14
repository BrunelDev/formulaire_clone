import React from "react";
import Image from "next/image";

export const MainContentSection = () => {
  const steps = [
    {
      id: 1,
      label: "Localisation",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step-3.svg",
      labelPosition: "-left-4",
    },
    {
      id: 2,
      label: "Estimation",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step-1.svg",
      labelPosition: "left-[-13px]",
    },
    {
      id: 3,
      label: "Projet",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step-5.svg",
      labelPosition: "left-0",
    },
    {
      id: 4,
      label: "Détails",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step.svg",
      labelPosition: "-left-0.5",
    },
    {
      id: 5,
      label: "Coordonnées",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step-4.svg",
      labelPosition: "-left-5",
    },
    {
      id: 6,
      label: "Finalisation",
      iconSrc: "https://c.animaapp.com/mf625dugC1mSjI/img/icon-step-2.svg",
      labelPosition: "-left-3.5",
      isLast: true,
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      {steps.map((step) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col w-8 h-8 items-center justify-center gap-2.5 relative bg-[#db4200] rounded-[1000px]">
            <Image
              width={20}
              height={20}
              className="relative w-5 h-5"
              alt="Icon step"
              src={step.iconSrc}
            />

            <div
              className={`${
                step.labelPosition
              } opacity-80 font-[number:var(--text-smaller-font-weight)] absolute top-[35px] ${
                step.isLast ? "font-label-smaller" : "font-text-smaller"
              } text-[#021327] ${
                step.isLast
                  ? "text-[length:var(--label-smaller-font-size)]"
                  : "text-[length:var(--text-smaller-font-size)]"
              } text-center ${
                step.isLast
                  ? "tracking-[var(--label-smaller-letter-spacing)]"
                  : "tracking-[var(--text-smaller-letter-spacing)]"
              } ${
                step.isLast
                  ? "leading-[var(--label-smaller-line-height)]"
                  : "leading-[var(--text-smaller-line-height)]"
              } whitespace-nowrap ${
                step.isLast
                  ? "[font-style:var(--label-smaller-font-style)]"
                  : "[font-style:var(--text-smaller-font-style)]"
              }`}
            >
              {step.label}
            </div>
          </div>

          {!step.isLast && (
            <Image
              width={32}
              height={1}
              className="relative w-8 h-px object-cover"
              alt="Line"
              src="https://c.animaapp.com/mf625dugC1mSjI/img/line-4.svg"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

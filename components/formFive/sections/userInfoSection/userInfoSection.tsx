import Image from "next/image";
import React from "react";

export const UserInfoSection = () => {
  const steps = [
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step-3.svg",
      label: "Localisation",
      isCompleted: true,
      labelPosition: "-left-4",
    },
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step.svg",
      label: "Estimation",
      isCompleted: true,
      labelPosition: "left-[-13px]",
    },
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step-4.svg",
      label: "Projet",
      isCompleted: true,
      labelPosition: "left-0",
    },
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step-2.svg",
      label: "Détails",
      isCompleted: true,
      labelPosition: "-left-0.5",
    },
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step-5.svg",
      label: "Coordonnées",
      isCompleted: true,
      labelPosition: "-left-5",
      isCurrentStep: true,
    },
    {
      icon: "https://c.animaapp.com/mf2gfnauygUKoU/img/icon-step-1.svg",
      label: "Finalisation",
      isCompleted: false,
      labelPosition: "-left-3.5",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 w-full translate-y-[-1rem] animate-fade-in opacity-0">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col w-8 h-8 items-center justify-center gap-2.5 relative">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step.isCompleted
                  ? "bg-[#db4200]"
                  : "bg-[#f7f7f8] border border-solid border-[#b8b9c1]"
              }`}
            >
              <Image
                width={20}
                height={20}
                className="w-5 h-5"
                alt="Icon step"
                src={step.icon}
              />
            </div>

            <div
              className={`absolute top-[35px] ${step.labelPosition} ${
                step.isCurrentStep
                  ? "font-[number:var(--label-smaller-font-weight)] font-label-smaller text-[#021327] text-[length:var(--label-smaller-font-size)] text-center tracking-[var(--label-smaller-letter-spacing)] leading-[var(--label-smaller-line-height)] [font-style:var(--label-smaller-font-style)]"
                  : step.isCompleted
                  ? "opacity-80 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-[length:var(--text-smaller-font-size)] text-center tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
                  : "opacity-60 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-[length:var(--text-smaller-font-size)] text-center tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
              } whitespace-nowrap`}
            >
              {step.label}
            </div>
          </div>

          {index < steps.length - 1 && (
            <Image
              width={32}
              height={1}
              className="w-8 h-px object-cover"
              alt="Line"
              src="https://c.animaapp.com/mf2gfnauygUKoU/img/line-1.svg"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

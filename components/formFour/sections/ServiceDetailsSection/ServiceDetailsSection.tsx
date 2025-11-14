import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

export const ServiceDetailsSection = () => {
  const steps = [
    {
      id: 1,
      label: "Localisation",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step-1.svg",
      isCompleted: true,
      labelPosition: "-left-4",
    },
    {
      id: 2,
      label: "Estimation",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step-5.svg",
      isCompleted: true,
      labelPosition: "left-[-13px]",
    },
    {
      id: 3,
      label: "Projet",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step-3.svg",
      isCompleted: true,
      labelPosition: "left-0",
    },
    {
      id: 4,
      label: "Détails",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step-4.svg",
      isCompleted: true,
      labelPosition: "-left-0.5",
      isActive: true,
    },
    {
      id: 5,
      label: "Coordonnées",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step-2.svg",
      isCompleted: false,
      labelPosition: "-left-5",
    },
    {
      id: 6,
      label: "Finalisation",
      icon: "https://c.animaapp.com/mf61j077gweeKq/img/icon-step.svg",
      isCompleted: false,
      labelPosition: "-left-3.5",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 w-full translate-y-[-1rem] animate-fade-in opacity-0">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center relative">
            <div
              className={`flex w-8 h-8 items-center justify-center gap-2.5 relative rounded-[1000px] ${
                step.isCompleted
                  ? "bg-[#db4200]"
                  : "bg-[#f7f7f8] border border-solid border-[#b8b9c1]"
              }`}
            >
              <Image
                width={20}
                height={20}
                className="relative w-5 h-5"
                alt="Icon step"
                src={step.icon}
              />
            </div>

            <div
              className={`absolute top-[35px] ${
                step.labelPosition
              } text-center whitespace-nowrap ${
                step.isActive
                  ? "font-[number:var(--label-smaller-font-weight)] font-label-smaller text-[#021327] text-[length:var(--label-smaller-font-size)] tracking-[var(--label-smaller-letter-spacing)] leading-[var(--label-smaller-line-height)] [font-style:var(--label-smaller-font-style)]"
                  : step.isCompleted
                  ? "opacity-80 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-[length:var(--text-smaller-font-size)] tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
                  : "opacity-60 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-[length:var(--text-smaller-font-size)] tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
              }`}
            >
              {step.label}
            </div>
          </div>

          {index < steps.length - 1 && (
            <Separator
              orientation="horizontal"
              className="w-8 h-px bg-gray-300"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

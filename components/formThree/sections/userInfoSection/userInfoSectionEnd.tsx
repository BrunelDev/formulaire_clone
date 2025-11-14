import { useFormState } from "@/context/useContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export const UserInfoSection = () => {
  const { formData, updateFormData } = useFormState();

  const steps = [
    {
      icon: "/icons/localisation.svg",
      inactiveIcon: "/icons/localisation-inactive.svg",
      label: "Localisation",
      isCompleted: true,
      labelPosition: "-left-4",
      isCurrent: !formData.isStepOneChecked,
    },
    {
      icon: "/icons/estimation.svg",
      inactiveIcon: "/icons/estimation-inactive.svg",
      label: "Estimation",
      isCompleted: formData.isStepOneChecked && formData.isStepTwoChecked,
      labelPosition: "left-[-13px]",
      isCurrent: formData.isStepOneChecked && !formData.isStepTwoChecked,
    },
    {
      icon: "/icons/projets.svg",
      inactiveIcon: "/icons/projets-inactive.svg",
      label: "Projet",
      isCompleted:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked,
      labelPosition: "left-0",
      isCurrent:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        !formData.isStepThreeChecked,
    },
    {
      icon: "/icons/details.svg",
      inactiveIcon: "/icons/details-inactive.svg",
      label: "Détails",
      isCompleted:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        formData.isStepFourChecked,
      labelPosition: "-left-0.5",
      isCurrent:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        !formData.isStepFourChecked,
    },
    {
      icon: "/icons/coordonnees.svg",
      inactiveIcon: "/icons/coordonnees-inactive.svg",
      label: "Coordonnées",
      isCompleted:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        formData.isStepFourChecked &&
        formData.isStepFiveChecked,
      labelPosition: "-left-5",
      isCurrent:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        formData.isStepFourChecked &&
        !formData.isStepFiveChecked,
    },
    {
      icon: "/icons/finalisation.svg",
      inactiveIcon: "/icons/finalisation-inactive.svg",
      label: "Finalisation",
      isCompleted:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        formData.isStepFourChecked &&
        formData.isStepFiveChecked &&
        formData.isStepSixChecked,
      labelPosition: "-left-3.5",
      isCurrent:
        formData.isStepOneChecked &&
        formData.isStepTwoChecked &&
        formData.isStepThreeChecked &&
        formData.isStepFourChecked &&
        formData.isStepFiveChecked &&
        !formData.isStepSixChecked,
    },
  ];
  const handleNavigation = (stepIndex: number) => {
    if (stepIndex === 0 && formData.isStepOneChecked) {
      updateFormData({
        ...formData,
        isStepOneChecked: false,
        isStepTwoChecked: false,
        isStepThreeChecked: false,
        isStepFourChecked: false,
        isStepFiveChecked: false,
        isStepSixChecked: false,
      });
      return;
    }
    if (stepIndex === 1 && formData.isStepTwoChecked) {
      updateFormData({
        ...formData,
        isStepTwoChecked: false,
        isStepThreeChecked: false,
        isStepFourChecked: false,
        isStepFiveChecked: false,
        isStepSixChecked: false,
      });
      return;
    }
    if (stepIndex === 2 && formData.isStepThreeChecked) {
      updateFormData({
        ...formData,
        isStepThreeChecked: false,
        isStepFourChecked: false,
        isStepFiveChecked: false,
        isStepSixChecked: false,
      });
      return;
    }
    if (stepIndex === 3 && formData.isStepFourChecked) {
      updateFormData({
        ...formData,
        isStepFourChecked: false,
        isStepFiveChecked: false,
        isStepSixChecked: false,
      });
      return;
    }
    if (stepIndex === 4 && formData.isStepFiveChecked) {
      updateFormData({
        ...formData,
        isStepFiveChecked: false,
        isStepSixChecked: false,
      });
      return;
    }
    if (stepIndex === 5 && formData.isStepSixChecked) {
      updateFormData({
        ...formData,
        isStepSixChecked: false,
      });
      return;
    }
  };
  const router = useRouter();
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 w-full translate-y-[-1rem] animate-fade-in opacity-0 px-4 sm:px-0 ">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className="flex flex-col w-6 h-6 sm:w-8 sm:h-8 items-center justify-center gap-2.5 relative cursor-pointer flex-shrink-0"
            onClick={() => router.back()}
          >
            <div
              className={
                "flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#db4200]"
              }
            >
              <Image
                className="w-3 h-3 sm:w-5 sm:h-5"
                width={20}
                height={20}
                alt="Icon step"
                src={step.icon}
              />
            </div>

            <div
              className={`absolute top-[28px] sm:top-[35px] left-1/2 transform -translate-x-1/2 ${
                step.label === "Finalisation"
                  ? "font-[number:var(--label-smaller-font-weight)] font-label-smaller text-[#021327] text-xs sm:text-[length:var(--label-smaller-font-size)] text-center tracking-[var(--label-smaller-letter-spacing)] leading-[var(--label-smaller-line-height)] [font-style:var(--label-smaller-font-style)]"
                  : step.isCompleted
                  ? "opacity-80 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-xs sm:text-[length:var(--text-smaller-font-size)] text-center tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
                  : "opacity-60 font-[number:var(--text-smaller-font-weight)] font-text-smaller text-[#021327] text-xs sm:text-[length:var(--text-smaller-font-size)] text-center tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)]"
              } whitespace-nowrap hidden md:block`}
            >
              {step.label}
            </div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={
                "w-4 sm:w-8 h-[1px] border border-syracuse_red_orange object-cover flex-shrink-0"
              }
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

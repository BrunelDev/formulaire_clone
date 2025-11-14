import { useFormState } from "@/context/useContext";
import Image from "next/image";
import { useEffect } from "react";
import Mapbox from "../mapbox";
import BackButton from "../PrimaryButton/BackButton";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

export function FormTwo() {
  const { formData, updateFormData } = useFormState();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="bg-[#f7f7f8]">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* User Profile */}
            <div className="flex items-start gap-3.5 relative self-stretch w-full flex-[0_0_auto]  animate-fade-in opacity-0 [--animation-delay:200ms]">
              <Image
                className="relative w-[60px] h-[60px]"
                width={60}
                height={60}
                alt="Ellipse"
                src={"/images/jeremy.png"}
              />

              <div className="flex flex-col items-start gap-2 relative flex-1 grow">
                <div className="relative self-stretch mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)]">
                  Jérémy
                </div>

                <div className="relative self-stretch font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                  {/* Main Content */}
                  <div className="space-y-2">
                    <p className="text-[#021327] leading-relaxed text-xs sm:text-sm">
                      Votre adresse se situe dans une zone{" "}
                      <span className="text-[#094d9a] font-medium">
                        {formData.addressDetails?.urbanZone || "Non disponible"}
                        {formData.addressDetails?.urbanZone &&
                          " (" + formData.addressDetails?.zoneType + ")"}
                      </span>{" "}
                      du Plan Local d&apos;Urbanisme (PLU) de la commune de{" "}
                      <span className="text-[#094d9a] font-medium">
                        {formData.addressDetails?.city?.toUpperCase() ||
                          "NON DISPONIBLE"}
                      </span>
                      .
                    </p>

                    <p className="text-[#021327] leading-relaxed text-xs sm:text-sm">
                      Nous estimons la difficulté à{" "}
                      <span className="text-[#094d9a] font-medium">
                        {formData.addressDetails?.difficultyEstimation || 3}/5
                      </span>{" "}
                      pour obtenir une autorisation d&apos;urbanisme à cet
                      endroit.
                    </p>

                    <p className="text-[#021327] leading-relaxed text-xs sm:text-sm">
                      Nous vous conseillons de vous faire aider. Passez à
                      l&apos;étape suivante !
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Summary */}
            <div className="flex items-center gap-5 bg-background p-4  animate-fade-in opacity-0 [--animation-delay:400ms]">
              <div className="space-y-6 pt-6">
                <h3 className="text-sm sm:text-lg font-semibold text-[#021327]">
                  Récapitulatif des informations
                </h3>

                <div className="space-y-4">
                  <div>
                    <span className="text-[#021327] text-xs sm:text-sm">
                      Localisation :{" "}
                    </span>
                    <span className="text-[#094d9a] font-medium">
                      {formData.addressDetails?.formattedAddress ||
                        formData.address ||
                        "Adresse non sélectionnée"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#021327] text-xs sm:text-sm">
                      Numéro de parcelle :{" "}
                    </span>
                    <span className="text-[#094d9a] font-medium">
                      {formData.addressDetails?.parcelNumber ||
                        "Non disponible"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#021327] text-xs sm:text-sm">
                      Mairie :{" "}
                    </span>
                    <span className="text-[#094d9a] font-medium">
                      {formData.addressDetails?.city || "Non disponible"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#021327] text-xs sm:text-sm">
                      Zone d&apos;urbanisme de la parcelle :{" "}
                    </span>
                    <span className="text-[#094d9a] font-medium">
                      {formData.addressDetails?.urbanZone || "Non disponible"}
                    </span>
                  </div>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-[#021327] font-medium text-xs sm:text-sm">
                    Estimation de la difficulté
                  </span>
                  <div className="bg-[#094d9a] text-white px-4 py-2 rounded-full font-semibold">
                    {formData.addressDetails?.difficultyEstimation || 3}/5
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}

            <div className="hidden sm:flex items-center justify-between pt-8  animate-fade-in opacity-0 [--animation-delay:600ms]">
              <BackButton
                handleClick={() => {
                  updateFormData({
                    ...formData,
                    isStepTwoChecked: false,
                    isStepOneChecked: false,
                  });
                }}
                disabled={!formData.isStepTwoChecked}
              />

              <PrimaryButton
                className={undefined}
                handleClick={() => {
                  updateFormData({
                    ...formData,
                    isStepTwoChecked: true,
                  });
                }}
              />
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="relative  animate-fade-in opacity-0 [--animation-delay:800ms]">
            <div className="w-full h-[600px] rounded-lg overflow-hidden">
              <Mapbox
                coordinates={formData.addressDetails?.coordinates}
                zoom={17}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="flex items-center justify-between animate-fade-in opacity-0 [--animation-delay:600ms] fixed bottom-0 left-0 right-0 bg-[#ffffffaa] pt-10 pb-14 px-4 shadow-xl backdrop-blur-lg">
          <BackButton
            handleClick={() => {
              updateFormData({
                ...formData,
                isStepTwoChecked: false,
                isStepOneChecked: false,
              });
            }}
            disabled={!formData.isStepTwoChecked}
          />

          <PrimaryButton
            className={undefined}
            handleClick={() => {
              updateFormData({
                ...formData,
                isStepTwoChecked: true,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

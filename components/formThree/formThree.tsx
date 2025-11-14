import { Option, useFormState } from "@/context/useContext";
import { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
import Mapbox from "../mapbox";
import BackButton from "../PrimaryButton/BackButton";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

export const FormThree = () => {
  const { formData, updateFormData, resetStepThree } = useFormState();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const projectOptions = [
    {
      id: Option.PERMIS_CONSTRUIRE,
      title: "Permis de construire",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36.png",
    },
    {
      id: Option.DECLARATION_PREALABLE,
      title: "Déclaration préalable de travaux",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-1.png",
    },
    {
      id: Option.DOSSIER_ERP,
      title: "Dossier E.R.P",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-2.png",
    },
    {
      id: Option.CERTIFICAT_URBANISME,
      title: "Certificat d'urbanisme",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-3.png",
    },
    {
      id: Option.PLAN_UNITE,
      title: "Réalisation plan à l'unité",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-4.png",
    },
    {
      id: Option.ETUDE_RE2020,
      title: "Étude RE2020",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-5.png",
    },
    {
      id: Option.AIDE_CONCEPTION,
      title: "Aide à la conception",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-7.png",
    },
    {
      id: Option.ETUDE_SISMIQUE,
      title: "Étude sismique",
      image: "https://c.animaapp.com/mf2fxk6fBvYbpA/img/frame-36-6.png",
    },
  ];

  return (
    <div
      className="bg-[#f7f7f8] w-full flex justify-center py-8"
      data-model-id="55:360"
    >
      <div className="bg-[#f7f7f8] w-full relative sm:pb-0 pb-[150px]">
        <main className=" animate-fade-in opacity-0 [--animation-delay:400ms] flex flex-col lg:flex-row w-full gap-6 lg:gap-8  px-4 sm:px-8 lg:px-24">
          <div className="flex flex-col lg:px-4 items-start gap-6 lg:gap-8 flex-1">
            <div className="flex items-start gap-3.5 w-full">
              <Avatar className="w-[60px] h-[60px]">
                <AvatarImage src="https://c.animaapp.com/mf2fxk6fBvYbpA/img/ellipse-1.png" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-2 flex-1">
                <h2 className="font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)]">
                  Jérémy
                </h2>

                <p className="font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                  Adresse localisée et le secteur est validé !<br />
                  Dites-nous maintenant ce que vous souhaitez réaliser parmi les
                  options ci-dessous pour obtenir votre autorisation
                  d&apos;urbanisme, puis passez à l&apos;étape suivante.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:grid  sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 w-full ">
              {projectOptions.map((option, index) => (
                <Card
                  key={option.id}
                  className={` animate-fade-in opacity-0 [--animation-delay:${
                    600 + index * 100
                  }ms] w-[125px] cursor-pointer transition-all hover:scale-105 ${
                    formData.option === option.id
                      ? "bg-[#042347] text-white"
                      : "bg-app-background hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    updateFormData({
                      ...formData,
                      option: option.id,
                    });
                    resetStepThree();
                  }}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-1 pt-1 pb-2">
                    <div
                      className="w-full h-[117px] rounded bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${option.image})` }}
                    />
                    <div className="flex h-[52px] items-center justify-center w-full">
                      <div
                        className={`text-center font-label-smaller font-[number:var(--label-smaller-font-weight)] text-xs sm:text-sm tracking-[var(--label-smaller-letter-spacing)] leading-[var(--label-smaller-line-height)] [font-style:var(--label-smaller-font-style)] px-2`}
                      >
                        {option.title}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="hidden sm:flex animate-fade-in opacity-0 [--animation-delay:1400ms] items-center justify-between w-full">
              <BackButton
                handleClick={() => {
                  updateFormData({
                    ...formData,
                    isStepTwoChecked: false,
                    isStepThreeChecked: false,
                  });
                }}
                disabled={!formData.isStepThreeChecked}
              />

              <PrimaryButton
                className={undefined}
                disabled={!formData.option}
                handleClick={() => {
                  if (
                    formData.option === Option.ETUDE_RE2020 ||
                    formData.option === Option.AIDE_CONCEPTION ||
                    formData.option === Option.ETUDE_SISMIQUE
                  ) {
                    updateFormData({
                      ...formData,
                      isStepFourChecked: true,
                      isStepThreeChecked: true,
                    });
                  } else {
                    updateFormData({
                      ...formData,
                      isStepThreeChecked: true,
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="animate-fade-in opacity-0 [--animation-delay:600ms] lg:w-[40%] min-h-[600px] bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden hidden lg:block">
            <Mapbox
              coordinates={formData.addressDetails?.coordinates}
              zoom={17}
            />
          </div>
          <div className="lg:hidden relative  animate-fade-in opacity-0 [--animation-delay:800ms]">
            <div className="w-full rounded-lg overflow-hidden">
              <Mapbox
                coordinates={formData.addressDetails?.coordinates}
                zoom={17}
              />
            </div>
          </div>
        </main>
      </div>
      <div className="sm:hidden flex items-center justify-between animate-fade-in opacity-0 [--animation-delay:600ms] fixed bottom-0 left-0 right-0 bg-[#ffffffaa] pt-10 pb-14 px-4 shadow-xl backdrop-blur-lg">
        <BackButton
          handleClick={() => {
            updateFormData({
              ...formData,
              isStepTwoChecked: false,
              isStepThreeChecked: false,
            });
          }}
          disabled={!formData.isStepThreeChecked}
        />

        <PrimaryButton
          className={undefined}
          disabled={!formData.option}
          handleClick={() => {
            if (
              formData.option === Option.ETUDE_RE2020 ||
              formData.option === Option.AIDE_CONCEPTION ||
              formData.option === Option.ETUDE_SISMIQUE
            ) {
              updateFormData({
                ...formData,
                isStepFourChecked: true,
                isStepThreeChecked: true,
              });
            } else {
              updateFormData({
                ...formData,
                isStepThreeChecked: true,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

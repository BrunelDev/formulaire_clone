import { useFormState } from "@/context/useContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GooglePlacesWrapper } from "../GooglePlacesAutocomplete/GooglePlacesWrapper";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

interface AddressDetails {
  coordinates?: {
    lat: number;
    lng: number;
  };
  formattedAddress?: string;
  parcelNumber?: string;
  urbanZone?: string;
  zoneType?: string;
  city?: string;
  placeId?: string;
  difficultyEstimation?: number;
}

export const FormOne = () => {
  const { formData, updateFormData, resetForm } = useFormState();
  const [address, setAddress] = useState(formData.address || "");
  const [error, setError] = useState("");

  // Sync local address state with context
  useEffect(() => {
    setAddress(formData.address || "");
  }, [formData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [resetForm]);

  // Function to calculate difficulty estimation based on address details
  const calculateDifficultyEstimation = (
    addressDetails: AddressDetails
  ): number => {
    let difficulty = 3; // Base difficulty

    // Ajustement selon la zone urbaine
    if (addressDetails.urbanZone) {
      const zone = addressDetails.urbanZone.toUpperCase();

      if (["UA", "UB"].some((z) => zone.includes(z))) {
        // aléatoire entre 3 et 5 inclus
        difficulty = Math.floor(Math.random() * 3) + 3;
      } else if (["UC", "UD"].some((z) => zone.includes(z))) {
        difficulty = 4;
      } else if (["AU", "A", "N", "AK"].some((z) => zone.includes(z))) {
        difficulty = 5;
      }
    }

    // Ajustement selon la ville
    if (addressDetails.city) {
      const city = addressDetails.city.toLowerCase();
      if (["paris", "lyon", "marseille"].some((c) => city.includes(c))) {
        difficulty = Math.min(5, difficulty + 1); // +1 mais borné à 5
      }
    }

    // Toujours borné entre 3 et 5
    difficulty = Math.min(5, Math.max(3, difficulty));

    return difficulty;
  };

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    updateFormData({ address: newAddress });
  };

  const handlePlaceSelect = (addressDetails: AddressDetails) => {
    const difficultyEstimation = calculateDifficultyEstimation(addressDetails);

    const updatedAddressDetails = {
      ...addressDetails,
      difficultyEstimation,
    };

    setAddress(addressDetails.formattedAddress || "");
    updateFormData({
      address: addressDetails.formattedAddress || "",
      addressDetails: updatedAddressDetails,
    });
  };
  return (
    <div className="bg-[#f7f7f8] grid justify-items-center align-items:start">
      <div className="bg-[#f7f7f8] relative flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-12 xl:px-[140px] gap-y-6 lg:gap-y-10 w-full max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-6 lg:gap-8 ">
          <div className="flex items-start gap-3 sm:gap-3.5 relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <Image
              className="relative w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex-shrink-0"
              width={60}
              height={60}
              alt="Ellipse"
              src={"/images/jeremy.png"}
            />

            <div className="flex flex-col items-start gap-2 relative flex-1 grow">
              <div className="relative self-stretch mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)]">
                Jérémy
              </div>

              <p className="relative self-stretch font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                Bienvenue chez Mes Plans de Permis !<br />
                Vous pensez à un permis de construire ou à une déclaration
                préalable ?<br />
                Avant de sortir les crayons et les mètres, regardons d&#39;abord
                ce que le règlement d&#39;urbanisme autorise sur votre terrain
                (promis, on traduit le jargon en français courant 😉).
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="flex flex-col items-start gap-1.5 relative self-stretch w-full flex-[0_0_auto]">
              <h6 className="font-medium text-oxford_blue_2">
                À quelle adresse souhaitez-vous obtenir une autorisation
                d&apos;urbanisme ?
              </h6>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-center gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex-1 sm:flex-auto w-full sm:w-auto">
                  <GooglePlacesWrapper
                    placeholder="16 rue latapie 33650 La Brède"
                    value={address}
                    onChange={handleAddressChange}
                    onPlaceSelect={handlePlaceSelect}
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                  />
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <PrimaryButton
                    className="w-full sm:w-auto"
                    handleClick={() => {
                      if (!address || address.trim() === "") {
                        setError("L'adresse est obligatoire.");
                        return;
                      }
                      setError("");
                      updateFormData({
                        ...formData,
                        address: address,
                        isStepOneChecked: true,
                      });
                    }}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <p className="relative self-stretch font-text-smaller font-[number:var(--text-smaller-font-weight)] text-subtitle-color text-xs sm:text-sm tracking-[var(--text-smaller-letter-spacing)] leading-[var(--text-smaller-line-height)] [font-style:var(--text-smaller-font-style)] text-center sm:text-left">
                Nous ne revendons jamais vos informations et les sécurisons.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-5 lg:gap-5 p-4 lg:p-0 rounded-lg lg:rounded-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] z-0 bg-white">
          <div className="flex flex-col w-full lg:w-[442px] items-start gap-4 lg:gap-5 lg:pl-5 lg:pr-0 lg:py-0 relative">
            <div className="relative self-stretch mt-[-1.00px] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-black text-sm sm:text-lg lg:text-xl tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] [font-style:var(--heading-h5-font-style)]">
              Récapitulatif des informations
            </div>

            <div className="flex flex-col items-start gap-3 sm:gap-4 relative self-stretch w-full flex-[0_0_auto]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] font-text-medium font-[number:var(--text-medium-font-weight)] text-[#042347] text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                  Localisation :
                </div>

                <p className="relative w-fit mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-[#094d9a] text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] break-words sm:whitespace-nowrap [font-style:var(--text-bold-medium-font-style)]">
                  {/*formData.addressDetails?.formattedAddress ||
                    formData.address ||
                    "Adresse non sélectionnée"*/}
                  16 rue latapie 33650 La Brède
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] font-text-medium font-[number:var(--text-medium-font-weight)] text-[#042347] text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                  Numéro de parcelle :
                </div>

                <div className="relative w-fit mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-[#094d9a] text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] whitespace-nowrap [font-style:var(--text-bold-medium-font-style)]">
                  {
                    //formData.addressDetails?.parcelNumber || "Non disponible"
                  }
                  AK 0084
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] font-text-medium font-[number:var(--text-medium-font-weight)] text-[#042347] text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                  Mairie :
                </div>

                <div className="relative w-fit mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-[#094d9a] text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] whitespace-nowrap [font-style:var(--text-bold-medium-font-style)]">
                  {
                    //formData.addressDetails?.city || "Non disponible"
                  }
                  La Brède
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 relative flex-[0_0_auto]">
                <p className="relative w-fit mt-[-1.00px] font-text-medium font-[number:var(--text-medium-font-weight)] text-[#042347] text-xs sm:text-sm tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                  Zone d&#39;urbanisme de la parcelle :
                </p>

                <div className="relative w-fit mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-[#094d9a] text-xs sm:text-sm tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] whitespace-nowrap [font-style:var(--text-bold-medium-font-style)]">
                  {
                    //formData.addressDetails?.urbanZone || "Non disponible"
                  }
                  UA
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-fit font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-black text-sm sm:text-lg lg:text-xl tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)]">
                Estimation de la difficulté
              </div>

              <div className="inline-flex px-4 sm:px-5 py-2 sm:py-3 flex-[0_0_auto] bg-[#094d9a] flex-col items-center justify-center gap-2.5 relative rounded-[1000px]">
                <div className="relative w-fit mt-[-1.00px] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-white text-sm sm:text-lg lg:text-xl tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)]">
                  {
                    //formData.addressDetails?.difficultyEstimation || 3
                  }
                  3/5
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-[442px] h-[250px] sm:h-[300px] lg:h-[334px] bg-[url(/images/sateliteView.png)] bg-cover bg-center rounded-lg lg:rounded-none animate-fade-in opacity-0 [--animation-delay:800ms]" />
        </div>
      </div>
    </div>
  );
};

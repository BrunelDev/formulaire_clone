import BackButton from "@/components/PrimaryButton/BackButton";
import { PrimaryButton } from "@/components/PrimaryButton/PrimaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Option, useFormState } from "@/context/useContext";
import {
  DevisRecord,
  generateDpDevis,
  generateErpDevis,
  generateRe2020Devis,
  generateResume,
  generateSismicDevis,
  generateUniteDevis,
  generateUrbanismFormDevis,
  genreratePermisDevis,
} from "@/lib/calculator";
import generateDevisPdf from "@/lib/generateDevisPdf";
import generateResumePdf from "@/lib/generateResume";
import { isValidPhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";

const statistics = [
  {
    value: "6800+",
    label: "Plans réalisés",
  },
  {
    value: "900+",
    label: "Cerfas remplis",
  },
  {
    value: "96%",
    label: "Permis acceptés",
  },
  {
    value: "70%",
    label: "D'économie",
  },
];

// Fonctions de validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  try {
    // Vérifie si le numéro est vide
    if (!phone || phone.length < 5) {
      return false;
    }

    // Vérifie que le numéro ne commence pas par +0
    if (phone.startsWith("+0") || phone.startsWith("0")) {
      return false;
    }

    // Utilise libphonenumber-js pour valider
    const fullPhone = phone.startsWith("+") ? phone : `+${phone}`;
    return isValidPhoneNumber(fullPhone);
  } catch (error) {
    return false;
  }
};

export const StatisticsSection = () => {
  const router = useRouter();
  const { formData, updateFormData } = useFormState();
  const [formErrors, setFormErrors] = useState<{
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const formFields = [
    {
      id: "nom",
      label: "Nom",
      placeholder: "Nom",
      value: nom,
      onChange: setNom,
      required: true,
      type: "text",
    },
    {
      id: "prenom",
      label: "Prénom",
      placeholder: "Prénom",
      value: prenom,
      onChange: setPrenom,
      required: true,
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      placeholder: "exemple@email.com",
      type: "email",
      value: email,
      onChange: setEmail,
      required: true,
    },
    {
      id: "telephone",
      label: "Téléphone",
      placeholder: "06 12 34 56 78",
      value: telephone,
      onChange: setTelephone,
      required: true,
      type: "tel",
    },
  ];

  const validateForm = () => {
    const errors: {
      nom?: string;
      prenom?: string;
      email?: string;
      telephone?: string;
    } = {};

    // Validation des champs requis
    if (!nom.trim()) {
      errors.nom = "Le nom est requis";
    }

    if (!prenom.trim()) {
      errors.prenom = "Le prénom est requis";
    }

    // Validation de l'email
    if (!email.trim()) {
      errors.email = "L'email est requis";
    } else if (!validateEmail(email)) {
      errors.email = "Format d'email invalide";
    }

    // Validation du téléphone
    if (!telephone.trim()) {
      errors.telephone = "Le téléphone est requis";
    } else if (!validatePhone(telephone)) {
      errors.telephone = "Numéro de téléphone invalide";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const urlToSendPdf =
  //   "https://hook.eu2.make.com/w5ps2bie8tnxj252b5grhyufigalaohw";
  const urlToSendData =
    "https://hook.eu2.make.com/h8xmhq9ryu6sdfa0jp0uv8e6qx0kk2vr";

  const handleGeneratePDF = async (client: {
    nom: string;
    prenom: string;
    email: string;
    tel: string;
  }) => {
    setLoading(true);

    try {
      const devisData = {
        REFERENCE_DEVIS: "DEVIS-2024-001",
        NUM_DEVIS: "001",
        DATE_DEVIS: new Date().toLocaleDateString("fr-FR"),
        CLIENT_NAME: "Jean Dupont",
        CLIENT_TEL: "06 12 34 56 78",
        CLIENT_MAIL: "jean.dupont@email.com",
        permis_Construire: "Permis de Construire",
        PU_Permis: "1200.00",
        TVA_Permis: "20%",
        HT_Permis: "1200.00",
        permis_Construire_class: "",
        plan_3D_class: "hidden-row",
        total_HT: "1200.00",
        total_TVA: "240.00",
        total_TTC: "1440.00",
      };

      let devis: DevisRecord[] = [];
      let htmlContent;
      if (formData.isArchitectNeeded) {
        devis = await generateResume(formData);

        htmlContent = generateResumePdf(
          devis,
          {
            nom: nom,
            prenom: prenom,
            email: email,
            tel: telephone,
          },
          formData.option === Option.PERMIS_CONSTRUIRE
            ? "Permis de Construire"
            : formData.option === Option.DECLARATION_PREALABLE
            ? "Déclaration Préalable"
            : formData.option === Option.DOSSIER_ERP
            ? "Dossier ERP"
            : formData.option === Option.CERTIFICAT_URBANISME
            ? "Certificat d'Urbanisme"
            : formData.option === Option.PLAN_UNITE
            ? "Plan à l'unité"
            : formData.option === Option.ETUDE_RE2020
            ? "Étude RE2020"
            : formData.option === Option.ETUDE_SISMIQUE
            ? "Étude Sismique"
            : formData.option === Option.AIDE_CONCEPTION
            ? "Aide à la Conception"
            : ""
        );
      } else {
        switch (formData.option) {
          case Option.DECLARATION_PREALABLE:
            devis = await generateDpDevis(formData);
            break;
          case Option.PLAN_UNITE:
            devis = await generateUniteDevis(formData);
            break;
          case Option.DOSSIER_ERP:
            devis = await generateErpDevis(formData);
            break;
          case Option.CERTIFICAT_URBANISME:
            devis = await generateUrbanismFormDevis(formData);
            break;
          case Option.PERMIS_CONSTRUIRE:
            devis = await genreratePermisDevis(formData);
            break;
          case Option.ETUDE_RE2020:
            devis = await generateRe2020Devis();
            break;
          case Option.ETUDE_SISMIQUE:
            devis = await generateSismicDevis();
            break;
        }
        htmlContent = generateDevisPdf(devis, client);
      }

      if (devis.length > 0) {
        const response = await fetch("/api/generate-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            htmlContent,
            filename: `devis-${devisData.NUM_DEVIS}.pdf`,
          }),
        });

        // Télécharger le PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const dataToSend = new FormData();
        dataToSend.append("pdf", blob, `devis-${devisData.NUM_DEVIS}.pdf`);
        dataToSend.append(
          "data",
          JSON.stringify({
            ...formData,
            clientLastName: nom,
            clientFirstName: prenom,
            clientEmail: email,
            clientPhone: telephone,
          })
        );

        // await fetch(urlToSendData, {
        //   method: "POST",
        //   body: dataToSend,
        // });
        // await fetch(urlToSendPdf, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/pdf",
        //   },
        //   body: blob,
        // });

        a.download = `devis-${devisData.NUM_DEVIS}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        // await fetch(urlToSendData, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     ...formData,
        //     clientLastName: nom,
        //     clientFirstName: prenom,
        //     clientEmail: email,
        //     clientPhone: telephone,
        //   }),
        // });
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la génération du PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = async () => {
    // Valider le formulaire avant de continuer
    const isValid = validateForm();

    if (!isValid) {
      if (formErrors.email) {
        toast.error(formErrors.email);
      }

      if (formErrors.telephone) {
        toast.error(formErrors.telephone);
      }
      return;
    }

    // Vérification spécifique de l'email avant soumission
    if (!validateEmail(email)) {
      setFormErrors({ ...formErrors, email: "Format d'email invalide" });
      alert("L'adresse email que vous avez saisie n'est pas valide.");
      return;
    }

    if (!validatePhone(telephone)) {
      setFormErrors({
        ...formErrors,
        telephone: "Numéro de téléphone invalide",
      });
      alert("Le numéro de téléphone que vous avez saisi n'est pas valide.");
      return;
    }

    const payload = {
      ...formData,
      clientLastName: nom,
      clientFirstName: prenom,
      clientEmail: email,
      clientPhone: telephone,
    };

    try {
      await handleGeneratePDF({
        nom: nom,
        prenom: prenom,
        email: email,
        tel: telephone,
      });

      updateFormData({ ...payload, isStepFiveChecked: true });
      if (
        formData.option === Option.AIDE_CONCEPTION ||
        (formData.isArchitectNeeded &&
          (formData.option === Option.PERMIS_CONSTRUIRE ||
            formData.option === Option.DOSSIER_ERP))
      ) {
        //router.push("/finalisation/personnel");
      } else {
        //router.push("/finalisation/devis");
      }
    } catch (error) {
      console.error("Erreur réseau lors de l'envoi au webhook", error);
    }
  };

  const [loading, setLoading] = useState(false);

  return (
    <section className="w-full sm:pb-8 pb-[150px]">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-5 w-full justify-center px-4">
        <div className="flex flex-col w-full lg:w-[40%] items-start gap-6 lg:gap-7 animate-fade-in opacity-0 [--animation-delay:0ms]">
          <div className="flex flex-col items-end gap-4 sm:gap-5 w-full">
            <header className="flex items-start gap-3 sm:gap-3.5 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              <Avatar className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex-shrink-0">
                <AvatarImage
                  src="https://c.animaapp.com/mf2gfnauygUKoU/img/ellipse-1.png"
                  alt="Jérémy"
                />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start gap-2 flex-1">
                <h2 className="font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-sm sm:text-[length:var(--text-bold-medium-font-size)] tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)]">
                  Jérémy
                </h2>

                <p className="font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-sm sm:text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                  Merci de compléter vos informations afin de finaliser votre
                  demande.
                  <br />
                  Votre devis vous sera envoyé instantanément par e-mail.
                </p>
              </div>
            </header>

            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              <form
                ref={formRef}
                className="flex flex-col items-start gap-4 w-full"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full">
                  {formFields.slice(0, 2).map((field) => (
                    <div
                      key={field.id}
                      className="flex flex-col items-stretch gap-2 flex-1 w-full"
                    >
                      <Label
                        htmlFor={field.id}
                        className="font-label-medium font-[number:var(--label-medium-font-weight)] text-[#042347] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] flex items-center"
                      >
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>

                      <div className="relative w-full">
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            // Clear error when user types
                            if (
                              formErrors[field.id as keyof typeof formErrors]
                            ) {
                              setFormErrors((prev) => ({
                                ...prev,
                                [field.id]: undefined,
                              }));
                            }
                          }}
                          className={`px-3 w-full sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                            formErrors[field.id as keyof typeof formErrors]
                              ? "border-red-500"
                              : "border-[#6d7074]"
                          }`}
                          required={field.required}
                        />
                        {formErrors[field.id as keyof typeof formErrors] && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors[field.id as keyof typeof formErrors]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full">
                  {formFields.slice(2, 4).map((field) => {
                    if (field.label === "Téléphone") {
                      return (
                        <div
                          className="flex flex-col gap-2 flex-1 w-full"
                          key={field.id}
                        >
                          <Label
                            htmlFor="telephone"
                            className="font-label-medium font-[number:var(--label-medium-font-weight)] text-[#042347] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] flex items-center"
                          >
                            Téléphone
                            <span className="text-red-500 ml-1">*</span>
                          </Label>

                          <PhoneInput
                            value={telephone}
                            onChange={(phone) => {
                              setTelephone(phone);
                              if (formErrors.telephone) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  telephone: undefined,
                                }));
                              }
                            }}
                            country={"fr"}
                            inputProps={{
                              name: "telephone",
                              required: true,
                            }}
                            containerStyle={{
                              width: "100%",
                            }}
                            buttonStyle={{
                              border: "1px solid #6d7074",
                              borderRight: "none",
                              borderRadius: "6px 0 0 6px",
                              backgroundColor: "transparent",
                              padding: "0 12px",
                              height: "48px",
                            }}
                            inputStyle={{
                              width: "100%",
                              height: "48px",
                              border: "1px solid  #6d7074",
                              borderRadius: "6px",
                              backgroundColor: "transparent",
                              paddingLeft: "60px",
                              fontSize: "14px",
                              fontFamily: "inherit",
                              outline: "none",
                              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
                              transition:
                                "color 0.2s, box-shadow 0.2s, border-color 0.2s",
                            }}
                            dropdownStyle={{
                              borderRadius: "6px",
                              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            }}
                            autoFormat={true}
                            isValid={(value) => {
                              if (!value) return true; // Permet le champ vide pendant la saisie
                              if (value.startsWith("0")) return false;
                              const fullPhone = value.startsWith("+")
                                ? value
                                : `+${value}`;
                              return isValidPhoneNumber(fullPhone);
                            }}
                          />
                          {formErrors.telephone && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors.telephone}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div
                        key={field.id}
                        className="flex flex-col items-stretch gap-2 flex-1 w-full"
                      >
                        <Label
                          htmlFor={field.id}
                          className="font-label-medium font-[number:var(--label-medium-font-weight)] text-[#042347] text-sm sm:text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)] flex items-center"
                        >
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </Label>

                        <div className="relative w-full">
                          <Input
                            id={field.id}
                            placeholder={field.placeholder}
                            className={`px-3 w-full sm:px-4 py-2.5 sm:py-3 rounded-lg border ${
                              formErrors[field.id as keyof typeof formErrors]
                                ? "border-red-500"
                                : "border-[#6d7074]"
                            } font-text-medium font-[number:var(--text-medium-font-weight)] text-placeholder-color text-sm sm:text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]`}
                            value={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              // Clear error when user types
                              if (
                                formErrors[field.id as keyof typeof formErrors]
                              ) {
                                setFormErrors((prev) => ({
                                  ...prev,
                                  [field.id]: undefined,
                                }));
                              }
                            }}
                            required={field.required}
                            type={field.type}
                          />
                          {formErrors[field.id as keyof typeof formErrors] && (
                            <p className="text-red-500 text-xs mt-1">
                              {formErrors[field.id as keyof typeof formErrors]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </form>

              <div className="hidden sm:flex flex-row sm:flex-row items-center justify-between gap-4 sm:gap-0 w-full">
                <BackButton
                  handleClick={() => {
                    updateFormData({
                      ...formData,
                      isStepFourChecked: false,
                      isStepFiveChecked: false,
                    });
                  }}
                />

                <PrimaryButton
                  isLoading={loading}
                  disabled={!nom || !prenom || !email || !telephone}
                  type="submit"
                  handleClick={handleNextStep}
                />
              </div>
            </div>
          </div>

          <Card className="w-full bg-[#042347] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] -z-10">
            <CardContent className="flex flex-col items-center justify-center gap-5 sm:gap-7 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-8 w-full">
                <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-3 flex-1 text-center sm:text-left">
                  <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-white text-lg sm:text-xl lg:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
                    Faites comme des milliers de français
                  </h3>

                  <p className="font-text-small font-[number:var(--text-small-font-weight)] text-white text-sm sm:text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
                    Optez pour notre service rapide et facile, et faites
                    réaliser vos plans sur mesure par des professionnels
                    compétents
                  </p>
                </div>

                <Image
                  width={120}
                  height={100}
                  className="w-[100px] h-[80px] sm:w-[120px] sm:h-[100px] object-cover flex-shrink-0"
                  alt="Urban building hero"
                  src="/images/Urban-building.png"
                />
              </div>

              <div className="grid grid-cols-2 sm:flex lg:grid lg:gap-4 lg:h-auto lg:mx-auto xl:flex sm:h-16 items-center lg:items-center lg:justify-center justify-center sm:justify-between gap-4 sm:gap-0 w-full">
                {statistics.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full sm:w-[98px] lg:w-full xl:w-[98px] items-center lg:items-center sm:items-start xl:items-start gap-1"
                  >
                    <div className="w-full  text-white text-2xl sm:text-3xl text-center">
                      {stat.value}
                    </div>

                    <div className="w-full font-text-medium text-white text-xs sm:text-sm text-center text-nowrap">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Image
          width={534}
          height={640}
          className="w-full lg:w-[40%] h-auto lg:h-[640px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms] object-contain hidden sm:block"
          alt="Frame"
          src="/images/frame51.svg"
        />
      </div>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 flex items-center justify-between animate-fade-in opacity-0 [--animation-delay:400ms]  bg-[#ffffffaa] pt-10 pb-14 px-4 shadow-xl backdrop-blur-lg">
        <BackButton
          handleClick={() => {
            updateFormData({
              ...formData,
              isStepFourChecked: false,
              isStepFiveChecked: false,
            });
          }}
        />

        <PrimaryButton
          isLoading={loading}
          disabled={!nom || !prenom || !email || !telephone}
          type="submit"
          handleClick={handleNextStep}
        />
      </div>
    </section>
  );
};

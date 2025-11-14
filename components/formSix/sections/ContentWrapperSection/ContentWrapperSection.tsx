import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardContent } from "../../../../components/ui/card";

const contactInfo = [
  {
    icon: "/icons/call.svg",
    label: "Nous appeler",
    value: "(+33) 6 56 74 54 70",
    href: "tel:+33656745470",
  },
  {
    icon: "/icons/mail.svg",
    label: "Nous écrire",
    value: "contact@mesplansdepermis.fr",
    href: "mailto:contact@mesplansdepermis.fr",
  },
];

const statistics = [
  {
    number: "6800+",
    label: "Plans réalisés",
  },
  {
    number: "900+",
    label: "Cerfas remplis",
  },
  {
    number: "96%",
    label: "Permis acceptés",
  },
  {
    number: "70%",
    label: "D'économie",
  },
];

export const ContentWrapperSection = () => {
  const searchParams = useParams();
  const isPersonnalized = searchParams.devis === "personnel";
  return (
    <section className="flex flex-col w-full items-start gap-4 sm:gap-3 pt-0 px-0 relative">
      {/* Header Section */}
      <header className="flex flex-col items-start w-full animate-fade-in opacity-0">
        <h1 className="w-full font-heading-h2 text-[#094d9a] tracking-[var(--heading-h2-letter-spacing)] leading-[var(--heading-h2-line-height)] font-medium text-lg sm:text-2xl">
          Félicitations !
        </h1>

        <p className="w-full font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color sm:text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)] text-xs sm:text-sm ">
          {isPersonnalized
            ? "Nous avons bien reçu votre demande de devis. Elle a été confiée à nos techniciens afin d'analyser plus en détail votre projet."
            : "Votre devis vient tout juste d'être envoyé dans votre boîte mail, consultez-le dès maintenant !"}
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-start gap-6 sm:gap-8 w-full animate-fade-in opacity-0 [--animation-delay:200ms]">
        <div className="flex flex-col items-start gap-2 w-full">
          {/* Contact Card */}
          <Card className="w-full bg-white border-0 shadow-none rounded-none">
            <CardContent className="flex flex-col items-start gap-4 p-4 sm:p-5">
              <div className="flex flex-col items-start gap-1 w-full">
                <h2 className="w-full mt-[-1.00px] font-heading-h3 text-[#021327] text-xs sm:text-xl tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] font-medium">
                  {isPersonnalized
                    ? "Un expert vous rappellera prochainement pour en savoir plus sur votre projet. "
                    : "Des questions ? Envie de valider votre devis ?"}
                </h2>

                <p className="w-full font-medium   tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] text-[#042347] text-xs sm:text-base ">
                  {isPersonnalized
                    ? "En attendant, vous pouvez nous contacter si vous avez la moindre question."
                    : "Contactez l'équipe dès maintenant par téléphone ou par mail."}
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 sm:gap-5 w-full">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="inline-flex items-center gap-3">
                    <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                      <Image
                        src={contact.icon}
                        alt="Ellipse"
                        width={40}
                        height={40}
                      />
                    </div>

                    <div className="inline-flex flex-col items-start">
                      <div className="mt-[-1.00px]  tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] font-medium text-xs sm:text-sm text-oxford_blue">
                        {contact.label}
                      </div>

                      <a
                        href={contact.href}
                        className="w-fit [font-family:'Figtree',Helvetica] font-normal text-sm sm:text-base tracking-[0] leading-4 transition-colors hover:opacity-80"
                      >
                        <span className="leading-[var(--text-medium-line-height)] underline font-text-medium [font-style:var(--text-medium-font-style)] font-[number:var(--text-medium-font-weight)] tracking-[var(--text-medium-letter-spacing)] text-xs sm:text-sm text-[#db4200]">
                          {contact.value}
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer Text */}
          <p className="w-full  text-[#6d7074] text-xs  tracking-[var(--text-smallest-letter-spacing)]  ">
            Les résultats des simulations sont indicatifs et ne constituent pas
            une offre définitive. Le devis final sera validé après examen
            attentif de votre dossier (et promis, on ne fait pas de lancer de
            fléchettes pour décider du prix).
            <br />
            <br />
            Si notre proposition vous plaît, envoyez-nous simplement un e-mail.
            Nous l&apos;étudierons sérieusement et vous confirmerons rapidement
            votre devis, pour avancer sereinement dans votre projet.
          </p>
        </div>

        {/* Statistics Section */}
        <Card className="w-full bg-[#042347] border-0 shadow-none animate-fade-in opacity-0 [--animation-delay:400ms] rounded-none ">
          <CardContent className="flex flex-col items-center justify-center gap-2.5 p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:flex sm:h-16 items-center justify-center gap-4 sm:gap-6 lg:gap-8 w-full">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full sm:w-[98px] items-center sm:items-start gap-1"
                >
                  <div className="w-full mt-[-1.00px]  text-white text-xl sm:text-3xl text-center tracking-[var(--heading-h1-letter-spacing)] leading-[var(--heading-h1-line-height)]">
                    {stat.number}
                  </div>

                  <div className="w-full font-text-medium font-[number:var(--text-medium-font-weight)] text-white text-xs sm:text-sm lg:text-[length:var(--text-medium-font-size)] text-center tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)] sm:text-nowrap">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

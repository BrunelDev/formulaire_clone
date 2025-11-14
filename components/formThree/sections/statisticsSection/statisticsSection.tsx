import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const formFields = [
  {
    id: "nom",
    label: "Nom",
    placeholder: "DOE",
    defaultValue: "DUPONT",
  },
  {
    id: "prenom",
    label: "Prénom",
    placeholder: "John",
    defaultValue: "Nicolas",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "johndoe@gmail.com",
    defaultValue: "nicolasdupont@gmail.com",
  },
  {
    id: "telephone",
    label: "Téléphone",
    placeholder: "0101010101",
    defaultValue: "0606060606",
  },
];

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

export const StatisticsSection = ()=> {
  return (
    <section className="flex items-center gap-5 w-full">
      <div className="flex flex-col w-[534px] items-start gap-7 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <div className="flex flex-col items-end gap-5 w-full">
          <header className="flex items-start gap-3.5 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage
                src="https://c.animaapp.com/mf2gfnauygUKoU/img/ellipse-1.png"
                alt="Jérémy"
              />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start gap-2 flex-1">
              <h2 className="font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-[length:var(--text-bold-medium-font-size)] tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)]">
                Jérémy
              </h2>

              <p className="font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
                Merci de compléter vos informations afin de finaliser votre
                demande.
                <br />
                Votre devis vous sera envoyé instantanément par e-mail.
              </p>
            </div>
          </header>

          <div className="flex flex-col items-start gap-8 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <form className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-start gap-5 w-full">
                {formFields.slice(0, 2).map((field) => (
                  <div
                    key={field.id}
                    className="flex flex-col items-start gap-2 flex-1"
                  >
                    <Label
                      htmlFor={field.id}
                      className="font-label-medium font-[number:var(--label-medium-font-weight)] text-[#042347] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)]"
                    >
                      {field.label}
                    </Label>

                    <div className="relative w-full">
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        className="px-4 py-3 rounded-lg border border-[#6d7074] font-text-medium font-[number:var(--text-medium-font-weight)] text-placeholder-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]"
                      />
                      <div className="absolute w-[116px] top-[23px] left-4 opacity-0 font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                        {field.defaultValue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-5 w-full">
                {formFields.slice(2, 4).map((field) => (
                  <div
                    key={field.id}
                    className="flex flex-col items-start gap-2 flex-1"
                  >
                    <Label
                      htmlFor={field.id}
                      className="font-label-medium font-[number:var(--label-medium-font-weight)] text-[#042347] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)]"
                    >
                      {field.label}
                    </Label>

                    <div className="relative w-full">
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        className="px-4 py-3 rounded-lg border border-[#6d7074] font-text-medium font-[number:var(--text-medium-font-weight)] text-placeholder-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]"
                      />
                      <div className="absolute w-[116px] top-[23px] left-4 opacity-0 font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] whitespace-nowrap [font-style:var(--text-medium-font-style)]">
                        {field.defaultValue}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>

            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                className="h-auto px-4 py-3 bg-[#f7f7f8] border-[#b8b9c1] text-subtitle-color font-label-medium font-[number:var(--label-medium-font-weight)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)]"
              >
                Étape précédente
              </Button>

              <Button className="h-auto px-4 py-3 bg-button-color text-white font-label-medium font-[number:var(--label-medium-font-weight)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] [font-style:var(--label-medium-font-style)]">
                Etape suivante
              </Button>
            </div>
          </div>
        </div>

        <Card className="w-full bg-[#042347] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <CardContent className="flex flex-col items-center justify-center gap-7 p-5">
            <div className="flex items-start justify-center gap-8 w-full">
              <div className="flex flex-col items-start gap-3 flex-1">
                <h3 className="font-heading-h3 font-[number:var(--heading-h3-font-weight)] text-white text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
                  Faites comme des milliers de français
                </h3>

                <p className="font-text-small font-[number:var(--text-small-font-weight)] text-white text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] [font-style:var(--text-small-font-style)]">
                  Optez pour notre service rapide et facile, et faites réaliser
                  vos plans sur mesure par des professionnels compétents
                </p>
              </div>

              <Image
                width={120}
                height={100}
                className="w-[120px] h-[100px] object-cover"
                alt="Urban building hero"
                src="https://c.animaapp.com/mf2gfnauygUKoU/img/urban-building-hero-image-1024x854-1.png"
              />
            </div>

            <div className="flex h-16 items-center justify-between w-full">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col w-[98px] items-start gap-1"
                >
                  <div className="w-full font-heading-h1 font-[number:var(--heading-h1-font-weight)] text-white text-[length:var(--heading-h1-font-size)] text-center tracking-[var(--heading-h1-letter-spacing)] leading-[var(--heading-h1-line-height)] [font-style:var(--heading-h1-font-style)]">
                    {stat.value}
                  </div>

                  <div className="w-full font-text-medium font-[number:var(--text-medium-font-weight)] text-white text-[length:var(--text-medium-font-size)] text-center tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
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
        className="w-[534px] h-[640px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]"
        alt="Frame"
        src="https://c.animaapp.com/mf2gfnauygUKoU/img/frame-51.svg"
      />
    </section>
  );
};

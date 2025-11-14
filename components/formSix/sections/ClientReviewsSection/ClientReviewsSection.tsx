import { StarIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ClientReviewsSection = () => {
  const stars = Array(5).fill(null);

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[calc(100vh-172px)] h-full bg-[linear-gradient(180deg,rgba(2,19,39,0)_0%,rgba(2,19,39,1)_100%),url(/images/finalisation-hero.jpg)] bg-cover bg-center bg-no-repeat animate-fade-in opacity-0 [--animation-delay:200ms] rounded-lg sm:rounded-none">
      <Card className="absolute bottom-0 left-0 right-0 bg-transparent border-0 shadow-none">
        <CardContent className="flex flex-col items-start gap-3 pt-4 sm:pt-5 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-2 w-full">
            <blockquote className="font-medium text-white text-lg sm:text-xl lg:text-[length:var(--heading-h3-font-size)] tracking-[var(--heading-h3-letter-spacing)] leading-[var(--heading-h3-line-height)] [font-style:var(--heading-h3-font-style)]">
              « Les échanges ont étés fluides, les plans réalisés rapidement et
              pour un coût très raisonnable. »
            </blockquote>

            <div className="flex items-center gap-1 w-full">
              <h6 className="flex-1 font-normal text-white text-sm sm:text-[length:var(--text-medium-font-size)]">
                Emmanuelle , Avis client
              </h6>
            </div>
          </div>

          <div className="inline-flex items-center gap-1 sm:gap-2">
            {stars.map((_, index) => (
              <StarIcon
                key={`star-${index}`}
                className="w-4 h-4 sm:w-[19.02px] sm:h-[18.09px] fill-current text-white"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

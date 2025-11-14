import { useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ClientFeedbackSection } from "./sections/ClientFeedbackSection/ClientFeedbackSection";
import { InformationSummarySection } from "./sections/InformationSummarySection/InformationSummarySection";
import { SummaryView } from "./summaryView";
export const FormFour = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="w-full  relative">
      <div className="bg-[#f7f7f8]">
        <div className="flex sm:flex-col flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-[28%] animate-fade-in opacity-0 [--animation-delay:600ms] pb-[150px] sm:pb-0">
            <ClientFeedbackSection />
          </div>
          <ScrollArea
            className="w-full lg:w-[42%] sm:h-[62vh] h-auto lg:h-[calc(100vh-172px)] px-2 sm:px-4 lg:px-5"
            scrollHideDelay={100}
          >
            <div className="w-full z-50 h-full">
              <InformationSummarySection />
            </div>
          </ScrollArea>
          <div className="w-full lg:w-[20%] animate-fade-in opacity-0 [--animation-delay:600ms] hidden sm:block">
            <SummaryView />
          </div>
        </div>
      </div>
    </div>
  );
};

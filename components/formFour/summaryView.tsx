import { useSummarySate } from "@/context/useSummary";
import Image from "next/image";

export function SummaryView() {
  const { summary } = useSummarySate();

  return (
    <div className="bg-[#ffffff] p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-none">
      <div className="">
        <h1 className="text-[#000000] text-[16px] font-medium mb-6 sm:mb-8">
          Récapitulatif des informations
        </h1>

        <div className="space-y-2 sm:space-y-3">
          {summary.map((item, index) => (
            <div key={index} className="relative">
              <Image
                src="/icons/check.svg"
                alt="Check Icon"
                width={16}
                height={16}
                className="absolute top-2"
              />
              <p className="text-[#000000] text-[16px] font-medium  leading-relaxed ml-5">
                {item.replace("?", "").replace(":", "")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

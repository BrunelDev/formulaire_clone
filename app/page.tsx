"use client";
import Footer from "@/components/Footer";
import { FormFive } from "@/components/formFive/formFive";
import { FormFour } from "@/components/formFour/formFour";
import { FormOne } from "@/components/formOne/formOne";
import { FormThree } from "@/components/formThree/formThree";
import { UserInfoSection } from "@/components/formThree/sections/userInfoSection/userInfoSection";
import { FormTwo } from "@/components/formTwo/formTwo";
import NavBar from "@/components/navBar";
import { useFormState } from "@/context/useContext";

export default function Home() {
  const { formData } = useFormState();
  const {
    isStepOneChecked,
    isStepTwoChecked,
    isStepThreeChecked,
    isStepFourChecked,
  } = formData;
  return (
    <div className="relative">
      <div className="fixed top-0 z-50 left-0 right-0">
        <NavBar />
      </div>
      <div className="mt-[120px] h-fit">
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] mb-[20px]">
          <UserInfoSection />
        </div>
        {isStepFourChecked ? (
          <FormFive />
        ) : isStepThreeChecked ? (
          <FormFour />
        ) : isStepTwoChecked ? (
          <FormThree />
        ) : isStepOneChecked ? (
          <FormTwo />
        ) : (
          <FormOne />
        )}
      </div>
      <Footer />
    </div>
  );
}

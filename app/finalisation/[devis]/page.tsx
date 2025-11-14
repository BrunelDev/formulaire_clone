"use client";
import Footer from "@/components/Footer";
import { FormSix } from "@/components/formSix/formSix";
import { UserInfoSection } from "@/components/formThree/sections/userInfoSection/userInfoSectionEnd";
import NavBar from "@/components/navBar";
import { useFormState } from "@/context/useContext";
import { useEffect } from "react";
export default function Home() {
  const { resetForm } = useFormState();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    resetForm();
  }, [resetForm]);
  return (
    <div className="relative">
      <div className="fixed top-0 z-50 left-0 right-0">
        <NavBar />
      </div>
      <div className="mt-[120px] h-fit">
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] mb-[20px]">
          <UserInfoSection />
        </div>
        <FormSix />
      </div>
      <Footer />
    </div>
  );
}

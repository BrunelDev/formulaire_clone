/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSummarySate } from "@/context/useSummary";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export function Question({
  question,
  description,
  handleChange,
  value,
  required = false,
  error,
}: {
  question: string;
  description?: string;
  handleChange: (value: boolean) => void;
  value?: string;
  required?: boolean;
  error?: string;
}) {
  const { setSummary, summary } = useSummarySate();
  return (
    <Card className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      <CardContent className="flex flex-col items-start gap-3 p-4 sm:p-5">
        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-sm sm:text-[length:var(--text-bold-medium-font-size)] tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)] flex items-center">
            {question}{" "}
            {required && <span className="text-red-500 ml-1">*</span>}
          </div>

          <div className="relative self-stretch font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-sm sm:text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
            {description}
          </div>
        </div>

        <RadioGroup
          value={value}
          onValueChange={(value: string) => {
            handleChange(value === "oui" ? true : false);

            if (value === "oui" && !summary.includes(question)) {
              setSummary([...summary, question]);
            } else if (value === "non" && summary.includes(question)) {
              setSummary(summary.filter((item) => item !== question));
            }
          }}
          className="inline-flex items-center gap-6 sm:gap-8 relative flex-[0_0_auto]"
        >
          <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
            <RadioGroupItem
              value="oui"
              id={question}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <Label
              htmlFor={question}
              className="relative w-fit mt-[-1.00px] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-[#021327] text-sm sm:text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)] cursor-pointer"
            >
              Oui
            </Label>
          </div>

          <div className="inline-flex items-center justify-center gap-2 relative flex-[0_0_auto]">
            <RadioGroupItem
              value="non"
              id="non"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <Label
              htmlFor="non"
              className="relative w-fit mt-[-1.00px] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-[#021327] text-sm sm:text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)] cursor-pointer"
            >
              Non
            </Label>
          </div>
        </RadioGroup>

        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </CardContent>
    </Card>
  );
}

export function QuestionWithInput({
  question,
  description,
  handleChange,
  handleInputChange,
  inputValue,
  value,
  placeholder,
  price,
  type,
  options,
  inputRequired = false,
  error,
  inputError,
}: {
  question: string;
  description?: string;
  handleChange: (value: boolean) => void;
  handleInputChange: (value: string | undefined) => void;
  inputValue?: string;
  value?: boolean;
  placeholder?: string;
  price?: string;
  type?: string;
  options?: { label: string; value: string }[];
  inputRequired?: boolean;
  error?: string;
  inputError?: string;
  index?: number;
  formData?: any;
}) {
  const [checked, setChecked] = useState(value || false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    inputValue || undefined
  );
  const { setSummary, summary } = useSummarySate();

  // Fonction utilitaire pour mettre à jour le résumé de manière cohérente
  const updateSummary = (
    questionText: string,
    inputValue?: string,
    isChecked?: boolean
  ) => {
    const summaryKey = inputValue
      ? `${questionText} - ${inputValue}`
      : questionText;

    if (isChecked === false) {
      // Si décoché, supprimer toutes les entrées liées à cette question
      setSummary(summary.filter((item) => !item.startsWith(questionText)));
    } else if (isChecked === true) {
      // Si coché sans valeur, ajouter juste la question
      if (!inputValue && !summary.includes(questionText)) {
        setSummary([...summary, questionText]);
      }
    } else if (inputValue) {
      // Si on a une valeur, mettre à jour ou ajouter l'entrée
      const existingIndex = summary.findIndex((item) =>
        item.startsWith(questionText)
      );
      if (existingIndex !== -1) {
        const updatedSummary = [...summary];
        updatedSummary[existingIndex] = summaryKey;
        setSummary(updatedSummary);
      } else {
        setSummary([...summary, summaryKey]);
      }
    } else if (!inputValue) {
      // Si on supprime la valeur, garder juste la question
      const existingIndex = summary.findIndex((item) =>
        item.startsWith(questionText)
      );
      if (existingIndex !== -1) {
        const updatedSummary = [...summary];
        updatedSummary[existingIndex] = questionText;
        setSummary(updatedSummary);
      }
    }
  };
  const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);

  return (
    <Card className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] w-full">
      <CardContent className="flex flex-col items-start gap-3 p-4 sm:p-5">
        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <Checkbox
              id={question}
              checked={checked}
              onCheckedChange={() => {
                const newChecked = !checked;
                setChecked(newChecked);
                handleChange(newChecked);

                // Si décoché, définir la valeur de l'input à undefined
                if (!newChecked) {
                  handleInputChange(undefined);

                  handleChange(false);
                  setSelectedOption("");
                }

                // Mise à jour du résumé avec la nouvelle fonction
                updateSummary(question, undefined, newChecked);
              }}
              className={`w-5 h-5 sm:w-6 sm:h-6 mt-0.5 ${
                checked ? "bg-syracuse_red_orange" : ""
              }`}
            />

            <div className="flex items-center gap-[4px_8px] ">
              <Label
                htmlFor={question}
                className="relative self-stretch w-fit mt-[-1.00px] font-text-bold-medium font-[number:var(--text-bold-medium-font-weight)] text-picto-color text-sm sm:text-[length:var(--text-bold-medium-font-size)] tracking-[var(--text-bold-medium-letter-spacing)] leading-[var(--text-bold-medium-line-height)] [font-style:var(--text-bold-medium-font-style)] cursor-pointer text-wrap flex items-center"
              >
                <h6 className="">
                  <span>{question}</span>

                  {price && (
                    <span className="w-fit font-text-small font-[number:var(--text-small-font-weight)] text-[#db4200] text-xs sm:text-[length:var(--text-small-font-size)] tracking-[var(--text-small-letter-spacing)] leading-[var(--text-small-line-height)] whitespace-nowrap [font-style:var(--text-small-font-style)] ml-1">
                      {price}
                    </span>
                  )}
                </h6>
              </Label>
            </div>
          </div>

          <div className="relative self-stretch font-text-medium font-[number:var(--text-medium-font-weight)] text-text-color text-sm sm:text-[length:var(--text-medium-font-size)] tracking-[var(--text-medium-letter-spacing)] leading-[var(--text-medium-line-height)] [font-style:var(--text-medium-font-style)]">
            <h6 className="text-wrap">{description}</h6>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {placeholder && type !== "option" && checked && (
          <div className="w-full">
            <Input
              value={inputValue}
              placeholder={placeholder}
              className={`w-full border ${
                inputError ? "border-red-500" : "border-gray-300"
              } p-2 rounded-lg`}
              required={inputRequired && checked}
              onChange={(e) => {
                const inputValue = e.target.value;
                handleInputChange(inputValue);

                // Mise à jour du résumé avec la nouvelle fonction
                updateSummary(question, inputValue);
              }}
            />
            {inputError && (
              <div className="text-red-500 text-sm mt-1">{inputError}</div>
            )}
          </div>
        )}

        {type === "option" && checked && (
          <div className="w-full">
            <Select
              required={inputRequired && checked}
              value={selectedOption}
              onValueChange={(value) => {
                setSelectedOption(value);
                handleInputChange(value);
                // Mise à jour du résumé avec la nouvelle fonction
                updateSummary(question, value);
              }}
            >
              <SelectTrigger
                className={`w-full ${inputError ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder={placeholder || "Sélectionnez"} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {inputError && (
              <div className="text-red-500 text-sm mt-1">{inputError}</div>
            )}
          </div>
        )}

        {type === "checkbox" && checked && (
          <div className="pl-3 w-full">
            <div className="sm:grid grid-cols-2 sm:gap-2 flex flex-col gap-3">
              {options?.map((option, optionIndex) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${question}-${optionIndex}`}
                    value={option.value}
                    checked={selectedBoxes.includes(option.value)}
                    onCheckedChange={(isChecked) => {
                      // Mise à jour du résumé avec la nouvelle fonction
                      const summaryKey = `${question} - ${option.label}`;
                      if (isChecked) {
                        handleInputChange(
                          JSON.stringify([...selectedBoxes, option.value])
                        );
                        setSelectedBoxes([...selectedBoxes, option.value]);
                        if (!summary.includes(summaryKey)) {
                          setSummary([...summary, summaryKey]);
                        }
                      } else {
                        setSelectedBoxes(
                          selectedBoxes.filter((item) => item !== option.value)
                        );
                        handleInputChange(JSON.stringify(selectedBoxes));
                        setSummary(
                          summary.filter((item) => item !== summaryKey)
                        );
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <Label
                    htmlFor={`${question}-${optionIndex}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            {inputError && (
              <div className="text-red-500 text-sm mt-1">{inputError}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

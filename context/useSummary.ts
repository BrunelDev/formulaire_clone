import { create } from "zustand";

interface SummarySate {
  summary: string[];
  setSummary: (val: string[]) => void;
}
export const useSummarySate = create<SummarySate>((set) => ({
  summary: [],
  setSummary: (val) => set(() => ({ summary: val })),
}));

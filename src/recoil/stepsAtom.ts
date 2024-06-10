import { atom } from "recoil";

interface Step1State {
  duration: number;
  travelCount: number;
  selectedBadges: string[];
}

interface Step2State {
  selectedDestinations: string[];
}

interface Step3State {
  title: string;
  content: string;
}

export const step1State = atom<Step1State>({
  key: "step1State",
  default: {
    duration: 0,
    travelCount: 0,
    selectedBadges: [],
  },
});

export const step2State = atom<Step2State>({
  key: "step2State",
  default: {
    selectedDestinations: [],
  },
});

export const step3State = atom<Step3State>({
  key: "step3State",
  default: {
    title: "",
    content: "",
  },
});

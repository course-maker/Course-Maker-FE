import { atom } from "recoil";

interface Tag {
  id: number;
  name: string;
  description: string;
}

interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

interface Destination {
  id: number;
  nickname: string;
  name: string;
  tags: Tag[];
  location: Location;
  pictureLink: string;
  content: string;
}

interface Step1State {
  duration: number;
  travelCount: number;
  tags: string[];
}

interface Step2State {
  courseDestinations: Record<number, Destination[]>;
}

interface Step3State {
  title: string;
  content: string;
  pictureLink: string;
}

export const step1State = atom<Step1State>({
  key: "step1State",
  default: {
    duration: 1,
    travelCount: 1,
    tags: [],
  },
});

export const step2State = atom<Step2State>({
  key: "step2State",
  default: {
    courseDestinations: {},
  },
});

export const step3State = atom<Step3State>({
  key: "step3State",
  default: {
    title: "",
    content: "",
    pictureLink: "",
  },
});

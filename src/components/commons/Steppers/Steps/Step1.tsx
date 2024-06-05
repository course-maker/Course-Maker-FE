import { ReactNode } from "react";

export interface ChapterProps {
  children: ReactNode;
}
const Step1 = ({ children }: ChapterProps) => {
  return <div>{children}</div>;
};

export default Step1;

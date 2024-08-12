import { ReactElement } from "react";

interface LabelWrapper {
  label: string;
  message: string;
  isEssential?: boolean;
  component: ReactElement;
}

const LabelWrapper = ({ label, message, isEssential, component: InputComponent }: LabelWrapper) => {
  return (
    <>
      <h2>
        {label}
        {isEssential && <span> *</span>}
      </h2>
      <p>{message}</p>
      {InputComponent}
    </>
  );
};
export default LabelWrapper;

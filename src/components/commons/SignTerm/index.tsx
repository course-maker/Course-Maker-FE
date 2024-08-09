import { TermModal } from "@/components/domains/signUp/TermModal";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { KeyboardEvent, ReactNode, useState } from "react";
import Image from "../Image";
import CheckboxSVG from "./CheckboxSVG";
import styles from "./SignTerm.module.scss";

const cx = classNames.bind(styles);

interface SignTermProps {
  id: string;
  checked: boolean;
  children: ReactNode;
  onChange: () => void;
}

const SignTerm = ({ id, checked, children, onChange }: SignTermProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => setIsModalOpen(false);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };
  return (
    <>
      <div className={cx("container", { all: id === "all" })}>
        <div className={cx("box")}>
          <input className={cx("checkbox")} id={id} type="checkbox" onChange={onChange} checked={checked} />
          <CheckboxSVG onChange={onChange} />
          <label className={cx("label")} htmlFor={id}>
            {children}
          </label>
        </div>
        {id !== "all" && (
          <button
            className={cx("button")}
            type="button"
            onClick={() => {
              setIsModalOpen(true);
            }}>
            <Image imageInfo={IMAGES.termMore} />
          </button>
        )}
      </div>
      <TermModal isOpen={isModalOpen} onCloseClick={closeModal} onKeyDown={handleKeyDown} />
    </>
  );
};
export default SignTerm;

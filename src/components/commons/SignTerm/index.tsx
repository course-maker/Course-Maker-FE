import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { ReactNode } from "react";
import Image from "../Image";
import styles from "./SignTerm.module.scss";

const cx = classNames.bind(styles);

interface SignTermProps {
  id: string;
  children: ReactNode;
  onChange?: () => void;
}

const SignTerm = ({ id, children, onChange }: SignTermProps) => {
  return (
    <div className={cx("container", { all: id === "all" })}>
      <div className={cx("box")}>
        <input className={cx("checkbox")} id={id} type="checkbox" onChange={onChange} />
        <label className={cx("label")} htmlFor={id}>
          {children}
        </label>
      </div>
      {id !== "all" && (
        <button className={cx("button")} type="button">
          <Image imageInfo={IMAGES.termMore} />
        </button>
      )}
    </div>
  );
};
export default SignTerm;

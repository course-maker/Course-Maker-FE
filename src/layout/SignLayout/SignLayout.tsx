import { ReactNode } from "react";
import styles from "./SignLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type SignLayoutProps = {
  header: string; // fix: type 지정하고 바꾸기
  form: ReactNode;
  oauth?: ReactNode;
};

const SignLayout = ({ header, form, oauth }: SignLayoutProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("items")}>
        <h1 className={cx("header")}>{header}</h1>
        {form}
        {oauth}
      </div>
    </div>
  );
};

export default SignLayout;

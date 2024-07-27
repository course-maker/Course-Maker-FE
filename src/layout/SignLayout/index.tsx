import Button from "@/components/commons/Button";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { PAGE_PATH } from "@/constants/pagePath";
import classNames from "classnames/bind";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./SignLayout.module.scss";

const cx = classNames.bind(styles);

type SignLayoutProps = {
  form: ReactNode;
  oauth?: ReactNode;
};

const SignLayout = ({ form, oauth }: SignLayoutProps) => {
  return (
    <div className={cx("container")}>
      <div className={cx("items")}>
        <Link to={PAGE_PATH.home}>
          <Button type="button">
            <Image imageInfo={IMAGES.courseMakerLogo} />
          </Button>
        </Link>
        {form}
        {oauth}
      </div>
    </div>
  );
};

export default SignLayout;

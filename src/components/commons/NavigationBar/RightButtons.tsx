import styles from "./RightButtons.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";

const cx = classNames.bind(styles);

const RightButtons = () => {
  const navigate = useNavigate();
  const isUserSignIn: boolean = true; // 전역 상태로 관리되는 값
  const { signIn, signUp } = PAGE_PATH;

  return isUserSignIn ? (
    <div className={cx("container")}>
      <Button color="emerald" variant="primary" size="small" onClick={() => navigate(signIn)}>
        로그인
      </Button>
      <Button color="emerald" variant="secondary" size="small" onClick={() => navigate(signUp)}>
        회원가입
      </Button>
    </div>
  ) : (
    <div className={cx("container")}>
      <Button color="emerald" variant="primary" size="small">
        마이페이지
      </Button>
      <Button color="emerald" variant="secondary" size="small">
        내 등급/뱃지
      </Button>
    </div>
  );
};

export default RightButtons;

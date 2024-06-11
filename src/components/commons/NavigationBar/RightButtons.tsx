import styles from "./RightButtons.module.scss";
import classNames from "classnames/bind";
import Button from "@/components/commons/Button";
import { useNavigate } from "react-router-dom";
import { PAGE_PATH } from "@/constants/pagePath";
import { useLogoutMutation } from "@/hooks/useLogoutMutation";

const cx = classNames.bind(styles);

const RightButtons = ({ isAuth }: { isAuth: boolean | null }) => {
  const navigate = useNavigate();
  const { logout } = useLogoutMutation();
  const { signIn, signUp } = PAGE_PATH;

  return isAuth ? (
    <div className={cx("container")}>
      <Button color="emerald" variant="primary" size="small">
        마이페이지
      </Button>
      <Button color="emerald" variant="secondary" size="small" onClick={() => logout()}>
        로그아웃
      </Button>
    </div>
  ) : (
    <div className={cx("container")}>
      <Button color="emerald" variant="primary" size="small" onClick={() => navigate(signIn)}>
        로그인
      </Button>
      <Button color="emerald" variant="secondary" size="small" onClick={() => navigate(signUp)}>
        회원가입
      </Button>
    </div>
  );
};

export default RightButtons;

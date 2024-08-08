import SignTerm from "@/components/commons/SignTerm";
import classNames from "classnames/bind";
import styles from "./SignTerms.module.scss";

const cx = classNames.bind(styles);
const SignTerms = () => {
  return (
    <div>
      <div className={cx("container")}>
        <SignTerm id="all">약관 전체 동의</SignTerm>
        <SignTerm id="first">이용 약관에 동의합니다.</SignTerm>
        <SignTerm id="second">개인정보수집・이용에 동의합니다.</SignTerm>
      </div>
      <p className={cx("message")}>※ 미동의 시 가입이 제한될 수 있습니다. </p>
    </div>
  );
};
export default SignTerms;

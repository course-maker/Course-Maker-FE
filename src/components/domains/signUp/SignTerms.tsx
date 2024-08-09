import SignTerm from "@/components/commons/SignTerm";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./SignTerms.module.scss";

const cx = classNames.bind(styles);

interface SignTermsProps {
  setAreTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignTerms = ({ setAreTermsAccepted }: SignTermsProps) => {
  const [terms, setTerms] = useState({
    all: false,
    first: false,
    second: false,
  });

  const handleCheckboxChange = (id: string) => {
    setTerms((prevTerms) => {
      const newTerms = { ...prevTerms, [id]: !prevTerms[id as keyof typeof terms] };

      if (id === "all") {
        const allChecked = newTerms.all;
        newTerms.first = allChecked;
        newTerms.second = allChecked;
      } else {
        newTerms.all = newTerms.first && newTerms.second;
      }

      return newTerms;
    });
  };

  useEffect(() => {
    setAreTermsAccepted(terms.all && terms.first && terms.second);
  }, [terms, setAreTermsAccepted]);

  return (
    <div className={cx("container")}>
      <div className={cx("terms")}>
        <SignTerm id="all" checked={terms.all} onChange={() => handleCheckboxChange("all")}>
          약관 전체 동의
        </SignTerm>
        <SignTerm id="first" checked={terms.first} onChange={() => handleCheckboxChange("first")}>
          이용 약관에 동의합니다.
        </SignTerm>
        <SignTerm id="second" checked={terms.second} onChange={() => handleCheckboxChange("second")}>
          개인정보수집・이용에 동의합니다.
        </SignTerm>
      </div>
      <p className={cx("message")}>※ 미동의 시 가입이 제한될 수 있습니다. </p>
    </div>
  );
};
export default SignTerms;

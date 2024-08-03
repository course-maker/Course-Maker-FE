import Image from "@/components/commons/Image";
import { EMAIL_DOMAIN_DROPDOWN } from "@/constants/dropdownMenu";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";

const cx = classNames.bind(styles);

interface DropdownProps {
  isError: boolean;
  domainValue: string;
  setDomainValue: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ isError, domainValue, setDomainValue }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownOption, setDropdownOption] = useState("직접입력");

  const handleDropdownClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuClick = (option: string, value: string) => {
    setDropdownOption(option);
    setDomainValue(value);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setDomainValue(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cx("dropdown")} ref={dropdownRef}>
      <div className={cx("dropdown-header", { error: isError })} onClick={handleDropdownClick}>
        {dropdownOption !== "직접입력" ? (
          <div className={cx("dropdown-header-field")}>{dropdownOption}</div>
        ) : (
          <input
            className={cx("dropdown-header-input", { error: isError })}
            type="text"
            placeholder="직접입력"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={handleInputChange}
            value={domainValue}
          />
        )}
        <button
          className={cx("dropdown-header-btn")}
          onClick={(e) => {
            e.preventDefault();
          }}>
          <Image imageInfo={IMAGES.grayTriangle} />
        </button>
      </div>
      {isDropdownOpen && (
        <ul className={cx("dropdown-menu")}>
          {Object.entries(EMAIL_DOMAIN_DROPDOWN).map(([key, { option, value }]) => (
            <li key={key} onClick={() => handleMenuClick(option, value)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

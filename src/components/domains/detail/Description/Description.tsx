import classNames from "classnames/bind";
import DOMPurify from "dompurify";
import styles from "./Description.module.scss";

const cx = classNames.bind(styles);

interface DescriptionProps {
  content: string;
}

const Description = ({ content }: DescriptionProps) => {
  const sanitizedContent = { __html: DOMPurify.sanitize(content) };

  return (
    <div className={cx("container")}>
      <p className={cx("content")} dangerouslySetInnerHTML={sanitizedContent} />
    </div>
  );
};
export default Description;

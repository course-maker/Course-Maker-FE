import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
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
      {content ? (
        <p className={cx("content")} dangerouslySetInnerHTML={sanitizedContent} />
      ) : (
        <p className={cx("none")}>
          <span className={cx("none-img")}>
            <Image imageInfo={IMAGES.courseMakerLogo} />
          </span>
          <span>{"여행지 소개글이 없어요."}</span>
          <span>{"가장 먼저 여행지를 소개해 보시겠어요?"}</span>
        </p>
      )}
    </div>
  );
};
export default Description;

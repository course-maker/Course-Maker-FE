import { Course } from "@/api/course/type";
import Button from "@/components/commons/Button";
import DetailActionButtons from "@/components/commons/DetailActionButtons";
import EditAndDeleteButton from "@/components/commons/EditAndDeleteButton";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

interface HeaderProps {
  type: "course" | "destination";
  data: Course;
  onEdit: () => void;
  onDelete: () => void;
}

const Header = ({ type, data, onEdit, onDelete }: HeaderProps) => {
  return (
    <>
      <div className={cx("header-container")}>
        <div className={cx("header-box")}>
          <div className={cx("content")}>
            <h1 className={cx("title")}>{data.title}</h1>
            {data.isMyCourse && <EditAndDeleteButton onEdit={onEdit} onDelete={onDelete} />}
          </div>

          <div className={cx("content")}>
            <div className={cx("detail-info")}>
              <span className={cx("nickname")}>작성자 {data.member.nickname}</span>
              <div className={cx("line")}>
                <Image imageInfo={IMAGES.ColumnLine} />
              </div>
              <div className={cx("view-count")}>
                <Image imageInfo={IMAGES.GrayStarIcon} /> {data.reviewCount}
              </div>
            </div>
            <div className={cx("icons")}>
              <DetailActionButtons type={type} data={data} />
            </div>
          </div>
        </div>
        <div className={cx("tags")}>
          {data.tags?.map((tag, id) => (
            <Button key={id} color="blue" variant="badge" size="xsmall" isSelected={true} isPointer={false}>
              {tag.name}
            </Button>
          ))}
        </div>
      </div>
      <ToastContainer limit={3} />
    </>
  );
};

export default Header;

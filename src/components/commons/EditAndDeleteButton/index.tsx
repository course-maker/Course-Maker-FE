import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import classNames from "classnames/bind";
import styles from "./EditAndDeleteButton.module.scss";

const cx = classNames.bind(styles);

interface EditAndDeleteButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const EditAndDeleteButton = ({ onEdit, onDelete }: EditAndDeleteButtonProps) => {
  return (
    <div className={cx("role-box")}>
      <button onClick={onEdit} className={cx("text-btn")}>
        수정
      </button>
      <div className={cx("line")}>
        <Image imageInfo={IMAGES.ColumnLine} />
      </div>
      <button onClick={onDelete} className={cx("text-btn")}>
        삭제
      </button>
    </div>
  );
};
export default EditAndDeleteButton;

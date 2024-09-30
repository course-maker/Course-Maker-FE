import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { authState } from "@/recoil/authAtom";
import classNames from "classnames/bind";
import { useRecoilState } from "recoil";
import styles from "./EditAndDeleteButton.module.scss";

const cx = classNames.bind(styles);

interface EditAndDeleteButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  isDestination?: boolean;
}

const EditAndDeleteButton = ({ onEdit, onDelete, isDestination }: EditAndDeleteButtonProps) => {
  const [auth] = useRecoilState(authState);
  const removeDeleteButton = isDestination && auth?.role !== "관리자";

  return (
    <div className={cx("role-box")}>
      <button onClick={onEdit} className={cx("text-btn")}>
        수정
      </button>
      {!removeDeleteButton && (
        <>
          <div className={cx("line")}>
            <Image imageInfo={IMAGES.ColumnLine} />
          </div>
          <button onClick={onDelete} className={cx("text-btn")}>
            삭제
          </button>
        </>
      )}
    </div>
  );
};
export default EditAndDeleteButton;

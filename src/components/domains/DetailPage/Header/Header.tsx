import { Course } from "@/api/course/type";
import Button from "@/components/commons/Button";
import EditAndDeleteButton from "@/components/commons/EditAndDeleteButton";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import useToast from "@/hooks/useToast";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

interface HeaderProps {
  data: Course;
  onLike: () => void;
  onBookmark: () => void;
  onKaKaoShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Header = ({ data, onLike, onBookmark, onKaKaoShare, onEdit, onDelete }: HeaderProps) => {
  const showToast = useToast();

  const handleLinkCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showToast("링크가 복사되었습니다.", "success");
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
      showToast("링크 복사에 실패했습니다. 다시 시도해주세요.", "error");
    }
  };

  const buttonData = [
    { onClick: onLike, image: IMAGES.GrayFavoriteIcon },
    { onClick: onBookmark, image: IMAGES.GrayBookmarkIcon },
    { onClick: onKaKaoShare, image: IMAGES.GrayKaKaoIcon },
    { onClick: handleLinkCopy, image: IMAGES.GrayLinkIcon },
  ];

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
              {buttonData.map((button, index) => (
                <button key={index} onClick={button.onClick} className={cx("action-btn")}>
                  <Image imageInfo={button.image} />
                </button>
              ))}
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

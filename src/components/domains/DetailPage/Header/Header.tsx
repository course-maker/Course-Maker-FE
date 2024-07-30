import { ToastContainer } from "react-toastify";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";
import { tagResponseDto } from "@/api/tag/type";
import useToast from "@/hooks/useToast";

const cx = classNames.bind(styles);

interface HeaderProps {
  title?: string;
  nickname?: string;
  tags?: tagResponseDto[];
  viewCount: number;
  onLike: () => void;
  onBookmark: () => void;
  onKaKaoShare: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Header = ({
  title,
  nickname,
  tags,
  viewCount,
  onLike,
  onBookmark,
  onKaKaoShare,
  onEdit,
  onDelete,
}: HeaderProps) => {
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
    <div className={cx("header-container")}>
      <div className={cx("header-box")}>
        <div className={cx("content")}>
          <h1 className={cx("title")}>{title}</h1>
          <div className={cx("detail-info")}>
            <span className={cx("nickname")}>작성자 {nickname}</span>
            <div className={cx("line")}>
              <Image imageInfo={IMAGES.ColumnLine} />
            </div>
            <div className={cx("view-count")}>
              <Image imageInfo={IMAGES.GrayStarIcon} /> {viewCount}
            </div>
          </div>
        </div>
        <div className={cx("actions")}>
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
          <div className={cx("icons")}>
            {buttonData.map((button, index) => (
              <button key={index} onClick={button.onClick} className={cx("action-btn")}>
                <Image imageInfo={button.image} />
              </button>
            ))}
          </div>
          <ToastContainer limit={3} />
        </div>
      </div>
      <div className={cx("tags")}>
        {tags?.map((tag, id) => (
          <span key={id} className={cx("tag")}>
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;

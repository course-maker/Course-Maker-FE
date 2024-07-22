import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Image from "@/components/commons/Image";
import { IMAGES } from "@/constants/images";

const cx = classNames.bind(styles);

interface HeaderProps {
  title?: string;
  nickname?: string;
  tags?: string[];
  viewCount: number;
  onLike: () => void;
  onBookmark: () => void;
  onKaKaoShare: () => void;
  onLinkCopy: () => void;
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
  onLinkCopy,
  onEdit,
  onDelete,
}: HeaderProps) => {
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
            <button onClick={onLike} className={cx("action-btn")}>
              <Image imageInfo={IMAGES.GrayFavoriteIcon} />
            </button>
            <button onClick={onBookmark} className={cx("action-btn")}>
              <Image imageInfo={IMAGES.GrayBookmarkIcon} />
            </button>
            <button onClick={onKaKaoShare} className={cx("action-btn")}>
              <Image imageInfo={IMAGES.GrayKaKaoIcon} />
            </button>
            <button onClick={onLinkCopy} className={cx("action-btn")}>
              <Image imageInfo={IMAGES.GrayLinkIcon} />
            </button>
          </div>
        </div>
      </div>
      <Image imageInfo={IMAGES.BottomLine} />
      <div className={cx("tags")}>
        {tags?.map((tag, index) => (
          <span key={index} className={cx("tag")}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;

import { useNavigate } from "react-router-dom";
import React from "react";
import Image from "@/components/commons/Image";
import Text from "@/components/commons/Text";
import { IMAGES } from "@/constants/images";

import { Course } from "@/api/course/type";
import { getDestinationResponseDto } from "@/api/destination/type";
import styles from "./SearchBar.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export type BarColor = "blue" | "gray";
export interface SearchBarProps {
  color?: BarColor;
  courseTitle?: string;
  destinationTitle?: string;
  course?: Course[];
  destination?: getDestinationResponseDto[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchBar = ({
  color = "blue",
  value,
  destination,
  course,
  courseTitle,
  destinationTitle,
  onChange,
}: SearchBarProps) => {
  const navigate = useNavigate();

  return (
    <div className={cx("search-bar-wrap")}>
      <div className={cx(`search-bar-${color}`, "search-bar")}>
        <Image className={cx("search_img")} imageInfo={IMAGES.GraySerchbarIcon} />
        <input type="text" placeholder="어디로 떠나시나요?" value={value} onChange={onChange} />
      </div>

      {/* 여행지 리스트 */}
      <div className={cx("list-container")}>
        {(destination && destination?.length > 0) || (course && course?.length > 0) ? (
          <>
            {course && course?.length > 0 && courseTitle && <p className={cx("list-type")}> {courseTitle} </p>}
            {course &&
              course?.map((item) => (
                <div className={cx("list-item")} key={item.id} onClick={() => navigate(`course/${item.id}`)}>
                  <Text className={cx("list-txt-top")} text={item.title} highlight={value} />
                  {item.tags.map((tag) => (
                    <p key={tag.id} className={cx("list-txt-bottom")}>
                      {tag.description}
                    </p>
                  ))}
                </div>
              ))}
            {destination && destination?.length > 0 && destinationTitle && (
              <p className={cx("list-type")}> {destinationTitle} </p>
            )}
            {destination &&
              destination?.map((item) => (
                <div className={cx("list-item")} key={item.id} onClick={() => navigate(`destination/${item.id}`)}>
                  <Text className={cx("list-txt-top")} text={item.name} highlight={value} />
                  <p className={cx("list-txt-bottom")}> {item.location.address} </p>
                </div>
              ))}
          </>
        ) : (
          <div className={cx("no-result")}>
            <p> 찾으시는 정보가 없습니다. </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

import { step3State } from "@/recoil/stepsAtom";
import classNames from "classnames/bind";
import React from "react";
import { useRecoilState } from "recoil";
import styles from "./Step3.module.scss";

const cx = classNames.bind(styles);

const Step3 = () => {
  const [step3, setStep3] = useRecoilState(step3State);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStep3({ ...step3, [name]: value });
  };

  return (
    <div>
      <div className={cx("schedule-container")}>
        <div className={cx("schedule-item-group")}>
          <div className={cx("schedule-item-tags")}>
            <p className={cx("schedule-item-title")}>선택한 태그</p>
            <div className={cx("tag-box")}>
              {mockdata[0].tags.map((tag, id) => (
                <span key={id} className={cx("tag-item")}>
                  {tag.description}
                </span>
              ))}
            </div>
          </div>
          <div className={cx("schedule-item-option")}>
            <div className={cx("schedule-item-box")}>
              <p className={cx("schedule-item-title")}>여행기간</p>
              <p className={cx("schedule-item-text")}>2일</p>
            </div>
            <div className={cx("schedule-item-box")}>
              <p className={cx("schedule-item-title")}>여행추천인원</p>
              <p className={cx("schedule-item-text")}>5인 이상</p>
            </div>
          </div>
        </div>
        <div className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            <button
              type="button"
              className={cx("day-btn", { active: activeDay === 1 })}
              onClick={() => setActiveDay(1)}>
              DAY1
            </button>
            <button
              type="button"
              className={cx("day-btn", { active: activeDay === 2 })}
              onClick={() => setActiveDay(2)}>
              DAY2
            </button>
          </div>
          <FilterCardList>
            <div className={cx("scrollable-list2")}>
              {filteredData.map((item, id) => (
                <div className={cx("item-container")} key={id}>
                  <div className={cx("number-circle")}>{id + 1}</div>
                  <div>
                    <img className={cx("item-image")} src={item.pictureLink} alt={`${item.title} 이미지`} />
                  </div>
                  <div className={cx("item-box")}>
                    <div className={cx("title-group")}>
                      <p className={cx("item-title")}>{item.title}</p>
                      <p className={cx("item-location")}>{item.location}</p>
                    </div>
                    {/* <div className={cx("score-group")}>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackHeartIcon} />
                          {item.heart}
                        </span>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackThumbsUpIcon} />
                          {item.thumbsUp}
                        </span>
                        <span className={cx("score-item")}>
                          <Image imageInfo={IMAGES.blackStarIcon} />
                          {item.rating}
                        </span>
                      </div> */}
                  </div>
                </div>
              ))}
            </div>
          </FilterCardList>
        </div>
      </div>
      <div className={cx("course-input-group")}>
        <input
          type="text"
          placeholder="코스 이름을 입력하세요."
          className={cx("course-title-input")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Step3;

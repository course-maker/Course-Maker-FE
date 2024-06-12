import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { step1State, step2State, step3State } from "@/recoil/stepsAtom";
import classNames from "classnames/bind";
import styles from "./Step3.module.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import NavigationButtons from "../../NavigationButtons/NavigationButtons";
// import { postImage } from "@/api/image";

const cx = classNames.bind(styles);

const Step3: React.FC = () => {
  const step1 = useRecoilValue(step1State);
  const step2 = useRecoilValue(step2State);
  const [step3, setStep3] = useRecoilState(step3State);
  const [activeDay, setActiveDay] = useState(1);
  // const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStep3({ ...step3, [name]: value });
  };

  const handleQuillChange = (content: string) => {
    setStep3({ ...step3, content });
  };

  const getDestinationsForActiveDay = () => {
    return step2.courseDestinations[activeDay] || [];
  };

  // const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setImage(file);

  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const response = await postImage(formData);
  //       if (response.length > 0) {
  //         setStep3({ ...step3, pictureLink: response[0] });
  //       } else {
  //         alert("이미지 업로드에 실패했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("Failed to upload image:", error);
  //       alert("이미지 업로드 중 오류가 발생했습니다.");
  //     }
  //   }
  // };

  return (
    <>
      <div className={cx("schedule-container")}>
        <div className={cx("schedule-item-group")}>
          <div className={cx("schedule-item-tags")}>
            <p className={cx("schedule-item-title")}>선택한 태그</p>
            <div className={cx("tag-box")}>
              {step1.tags.map((tag, id) => (
                <span key={id} className={cx("tag-item")}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={cx("schedule-item-option")}>
            <div className={cx("schedule-item-box")}>
              <p className={cx("schedule-item-title")}>여행기간</p>
              <p className={cx("schedule-item-text")}>{step1.duration}일</p>
            </div>
            <div className={cx("schedule-item-box")}>
              <p className={cx("schedule-item-title")}>여행추천인원</p>
              <p className={cx("schedule-item-text")}>{step1.travelCount}명</p>
            </div>
          </div>
        </div>
        <div className={cx("schedule-group")}>
          <div className={cx("day-btn-group")}>
            {[...Array(step1.duration)].map((_, index) => (
              <button
                type="button"
                className={cx("day-btn", { active: activeDay === index + 1 })}
                onClick={() => setActiveDay(index + 1)}
                key={index}>
                DAY{index + 1}
              </button>
            ))}
          </div>
          <div className={cx("scrollable-list2")}>
            {getDestinationsForActiveDay().map((item, id) => (
              <div className={cx("item-container")} key={id}>
                <div className={cx("number-circle")}>{id + 1}</div>
                <div>
                  <img className={cx("item-image")} src={item.pictureLink} alt={`${item.name} 이미지`} />
                </div>
                <div className={cx("item-box")}>
                  <div className={cx("title-group")}>
                    <p className={cx("item-title")}>{item.name}</p>
                    <p className={cx("item-location")}>{item.location.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cx("course-input-group")}>
        <input
          type="text"
          name="title"
          placeholder="코스 이름을 입력하세요."
          className={cx("course-title-input")}
          onChange={handleChange}
        />
        <div className={cx("image-upload")}>
          <label htmlFor="image">파일첨부</label>
          {/* <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} /> */}
        </div>
        <ReactQuill value={step3.content} onChange={handleQuillChange} />
        <NavigationButtons />
      </div>
    </>
  );
};

export default Step3;

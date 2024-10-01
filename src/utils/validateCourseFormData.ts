import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */
export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const { title, tags, duration, travelerCount, courseDestinations, pictureLink, content } = data;

  if (!title) {
    alert("코스 이름을 입력해 주세요.");
    setFocus("title");
    return false;
  }

  if (!duration) {
    alert("여행 기간을 선택해 주세요.");
    setFocus("duration");
    return false;
  }

  if (!travelerCount) {
    alert("여행 추천 인원을 선택해 주세요.");
    setFocus("travelerCount");
    return false;
  }

  if (courseDestinations.length === 0) {
    alert("여행지를 하나 이상 선택해 주세요.");
    setFocus("courseDestinations");
    return false;
  }

  if (!pictureLink) {
    alert("대표 이미지를 첨부해주세요.");
    setFocus("pictureLink");
    return false;
  }

  if (tags.length === 0) {
    alert("태그를 하나 이상 선택해 주세요.");
    setFocus("tags");
    return false;
  }

  if (!content) {
    alert("여행지 소개글을 입력해 주세요.");
    setFocus("content");
    return false;
  }

  return true;
};

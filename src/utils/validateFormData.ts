import { FieldValues, UseFormSetFocus } from "react-hook-form";

/**
 * 폼 데이터를 검증하고, 필요한 경우 경고 메시지를 표시하고 해당 항목에 포커스를 맞춥니다.
 * @param {Object} data - 폼 데이터
 * @param {Function} setFocus - 폼 항목에 포커스를 맞추는 함수
 * @returns {boolean} - 유효한 데이터인 경우 true, 그렇지 않으면 false
 */
export const validateFormData = (data: FieldValues, setFocus: UseFormSetFocus<FieldValues>): boolean => {
  const { name, tags, location, content } = data;

  if (!name) {
    alert("여행지 이름을 입력해 주세요.");
    setFocus("name");
    return false;
  }

  if (tags.length === 0) {
    alert("태그를 하나 이상 선택해 주세요.");
    setFocus("tags");
    return false;
  }

  if (!location.address || !location.longitude || !location.latitude) {
    alert("주소를 등록해 주세요.");
    setFocus("location");
    return false;
  }

  if (!content) {
    alert("여행지 소개글을 입력해 주세요.");
    setFocus("content");
    return false;
  }

  return true;
};

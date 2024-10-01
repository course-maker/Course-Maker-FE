import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { postCourse } from "@/api/course/register";
import { useCourseMutation } from "@/hooks/course/mutations/useCourseMutation";
import CourseRegisterLayout from "@/layout/CourseRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

const CourseRegisterPage = () => {
  const navigate = useNavigate();
  const [formData] = useState({
    title: "",
    content: "",
    duration: "",
    travelerCount: "",
    travelType: 0,
    pictureLink: "",
    courseDestinations: [],
    tags: [],
  });

  const [isAuth] = useRecoilState(authState);

  useEffect(() => {
    if (isAuth?.role == "초보 여행가") {
      alert(`${isAuth?.nickname}님, 아쉽게도 작성 권한이 없습니다.😢 '중급 여행가' 등급 이상만 작성 가능합니다.`);
      navigate("/");
      return;
    }
  }, []);

  const { postCourse } = useCourseMutation();

  const handleSubmit = (data: FieldValues) => {
    if (isAuth) {
      postCourse.mutate(data as postCourse);
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return (
    <>
      <CourseRegisterLayout title="코스 등록하기" formData={formData} onSubmitClick={handleSubmit} />
    </>
  );
};

export default CourseRegisterPage;

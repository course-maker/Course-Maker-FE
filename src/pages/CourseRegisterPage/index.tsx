import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { postCourse } from "@/api/course/register";
import { useCourseMutation } from "@/hooks/course/mutations/useCourseMutation";
import CourseRegisterLayout from "@/layout/CourseRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

const CourseRegisterPage = () => {
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

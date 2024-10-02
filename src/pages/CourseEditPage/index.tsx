import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { postCourse } from "@/api/course/register";
import { getCourseDetail } from "@/api/course";

import { useCourseMutation } from "@/hooks/course/mutations/useCourseMutation";
import CourseRegisterLayout from "@/layout/CourseRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

const CourseEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();
  const { patchCourse } = useCourseMutation();
  const [isApiData, setIsApiData] = useState<boolean>(false);
  const [isAuth] = useRecoilState(authState);
  const [formData, setFormData] = useState<postCourse>({
    title: "",
    content: "",
    duration: 0,
    travelerCount: 0,
    travelType: 0,
    pictureLink: "",
    courseDestinations: [],
    tags: [],
  });

  console.log(formData);

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: () => getCourseDetail(Number(id)),
  });

  // 접근 권한 막기
  useEffect(() => {
    if (isAuth?.role == "초보 여행가") {
      alert(`${isAuth?.nickname}님, 아쉽게도 작성 권한이 없습니다.😢 '중급 여행가' 등급 이상만 작성 가능합니다.`);
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (courseDetailData) {
      const { isApiData, title, content, duration, travelerCount, travelType, pictureLink, courseDestinations, tags } =
        courseDetailData;

      setIsApiData(!!isApiData);
      setFormData({
        title,
        content,
        duration,
        travelerCount,
        travelType,
        pictureLink,
        courseDestinations,
        tags,
      });
    }
  }, [courseDetailData]);

  const handleSubmit = (data: FieldValues) => {
    if (isAuth) {
      const postData = data as postCourse;
      patchCourse.mutate({ postId, data: postData });
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return (
    <>
      <CourseRegisterLayout
        title="코스 수정하기"
        formData={formData}
        onSubmitClick={handleSubmit}
        isApiData={isApiData}
      />
    </>
  );
};

export default CourseEditPage;

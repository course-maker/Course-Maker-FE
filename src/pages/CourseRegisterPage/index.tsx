import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { postCourse } from "@/api/course/register";
import { useCourseMutation } from "@/hooks/course/mutations/useCourseMutation";
import CourseRegisterLayout from "@/layout/CourseRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

const CourseRegisterPage = () => {
  const mock = {
    visitOrder: 1,
    date: 1,
    destination: {
      id: 1,
      nickname: "coursemaker",
      name: "역시 부산은 해운대!",
      views: 100,
      tags: [
        {
          id: 1,
          name: "연인",
          description: "그래서, 커플이시겠다?",
        },
      ],
      location: {
        address: "부산광역시 해운대구 우동",
        longitude: 128.934,
        latitude: 35.169,
      },
      pictureLink: "http://example.com/coursemaker.jpg",
      content: "해운대 물이 깨끗하고, 친구들과 여행하기 너무 좋았어요!",
      averageRating: 4.5,
      isMyDestination: true,
      isApiData: false,
      wishCount: 70,
      reviewCount: 60,
      likeCount: 50,
      isMyWishDestination: true,
      isMyLikeDestination: true,
    },
  };
  const [formData] = useState({
    title: "",
    content: "",
    duration: "",
    travelerCount: "",
    travelType: 0,
    pictureLink: "",
    courseDestinations: [mock],
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

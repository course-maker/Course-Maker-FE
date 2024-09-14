import { useMutation /*useQueryClient*/ } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { createCourse, patchCourseApi } from "@/api/course";
import { postCourse } from "@/api/course/register";

export const useCourseMutation = () => {
  const navigate = useNavigate();

  const postCourse = useMutation({
    mutationFn: (data: postCourse) => createCourse(data),
    onSuccess: (data) => {
      alert("코스가 등록되었습니다.");
      navigate(`/course/${data.id}`);
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      const errorMessage = error?.response?.data?.message;
      switch (statusCode) {
        case 400:
          console.log(errorMessage);
          alert(errorMessage);
          break;
        case 409:
          alert("코스 이름이 이미 존재합니다. 다른 이름으로 변경해 주세요.");
          break;
        default:
          alert("코스 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const patchCourse = useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: postCourse }) => patchCourseApi(postId, data),
    onSuccess: (data) => {
      alert("코스가 수정되었습니다.");
      navigate(`/destination/${data.id}`);
      // invalidateCardList, // 쿼리 키 업데이트하기
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 409:
          alert("코스 이름이 이미 존재합니다. 다른 이름으로 변경해 주세요.");
          break;
        default:
          alert("코스 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return { postCourse, patchCourse };
};

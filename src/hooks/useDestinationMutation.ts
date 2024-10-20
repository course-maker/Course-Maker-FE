import { useMutation /*useQueryClient*/ } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { patchDestinationApi, postDestinationApi } from "@/api/destination";
import { postDestinationRequestDto } from "@/api/destination/type";

export const useDestinationMutation = () => {
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const invalidateCardList = () => {
  //   queryClient.invalidateQueries({ queryKey: ["/post/list"] }),
  //     queryClient.invalidateQueries({ queryKey: ["homeCardList"] });
  // };

  const postDestination = useMutation({
    mutationFn: (data: postDestinationRequestDto) => postDestinationApi(data),
    onSuccess: (data) => {
      alert("여행지가 등록되었습니다.");
      navigate(`/destination/${data.id}`);
      // invalidateCardList, // 쿼리 키 업데이트하기
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 401:
          alert("세션이 만료되어 다시 로그인 해주세요.");
          break;
        case 409:
          alert("이미 존재하는 여행지 이름입니다. 다른 이름으로 변경해 주세요.");
          break;
        default:
          alert("여행지 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const patchDestination = useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: postDestinationRequestDto }) =>
      patchDestinationApi(postId, data),
    onSuccess: (data) => {
      alert("여행지가 등록되었습니다.");
      navigate(`/destination/${data.id}`);
      // invalidateCardList, // 쿼리 키 업데이트하기
    },
    onError: (error: AxiosError) => {
      const statusCode = error?.response?.status;
      switch (statusCode) {
        case 409:
          alert("이미 존재하는 여행지 이름입니다. 다른 이름으로 변경해 주세요.");
          break;
        default:
          alert("여행지 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  return { postDestination, patchDestination };
};

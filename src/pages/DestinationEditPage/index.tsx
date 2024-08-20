import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

import { getDestinationApi } from "@/api/destination";
import { postDestinationRequestDto } from "@/api/destination/type";
import { useDestinationMutation } from "@/hooks/useDestinationMutation";
import SpotRegisterLayout from "@/layout/DestinationRegisterLayout";
import { authState } from "@/recoil/authAtom";

const SpotEditPage = () => {
  const [isApiData, setIsApiData] = useState<boolean>(false);
  const [formData, setFormData] = useState<postDestinationRequestDto>({
    name: "",
    tags: [],
    location: { address: "", latitude: 0, longitude: 0 },
    pictureLink: "",
    content: "",
  });

  const [isAuth] = useRecoilState(authState);
  const { patchDestination } = useDestinationMutation();

  const { id } = useParams();
  const postId = Number(id);

  const { data: destinationDetailData } = useQuery({
    queryKey: ["spotEdit", postId],
    queryFn: () => getDestinationApi(postId),
  });

  const handleSubmit = (data: FieldValues) => {
    if (isAuth) {
      const postData = data as postDestinationRequestDto;
      patchDestination.mutate({ postId, data: postData });
    } else {
      alert("로그인을 해주세요.");
    }
  };

  useEffect(() => {
    if (destinationDetailData) {
      const { apiData, name, tags, location, pictureLink, content } = destinationDetailData;

      setIsApiData(!!apiData);
      setFormData({
        name,
        tags,
        location,
        pictureLink,
        content,
      });
    }
  }, [destinationDetailData]);

  return (
    <SpotRegisterLayout
      title="여행지 수정하기"
      formData={formData}
      onSubmitClick={handleSubmit}
      isApiData={isApiData}
    />
  );
};

export default SpotEditPage;

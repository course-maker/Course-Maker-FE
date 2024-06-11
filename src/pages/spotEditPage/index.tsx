import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";

import SpotRegisterLayout from "@/layout/SpotRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useDestinationMutation } from "@/hooks/useDestinationMutation";
import { postDestinationRequestDto } from "@/api/destination/type";
import { getDestinationApi } from "@/api/destination";

const SpotEditPage = () => {
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

  const { data: spotDetailData } = useQuery({
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
    if (spotDetailData) {
      const { name, tags, location, pictureLink, content } = spotDetailData;
      setFormData({
        name,
        tags,
        location,
        pictureLink,
        content,
      });
    }
  }, [spotDetailData]);

  return <SpotRegisterLayout title="여행지 수정하기" formData={formData} onSubmitClick={handleSubmit} />;
};

export default SpotEditPage;

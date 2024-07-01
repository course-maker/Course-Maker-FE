import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { postDestinationRequestDto } from "@/api/destination/type";
import { useDestinationMutation } from "@/hooks/useDestinationMutation";
import SpotRegisterLayout from "@/layout/DestinationRegisterLayout";
import { authState } from "@/recoil/authAtom";
import { useRecoilState } from "recoil";

const SpotRegisterPage = () => {
  const [formData] = useState({
    name: "",
    tags: [],
    location: { address: "", latitude: 0, longitude: 0 },
    pictureLink: "",
    content: "",
  });

  const [isAuth] = useRecoilState(authState);
  const { postDestination } = useDestinationMutation();

  const handleSubmit = (data: FieldValues) => {
    if (isAuth) {
      postDestination.mutate(data as postDestinationRequestDto);
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return (
    <>
      <SpotRegisterLayout title="여행지 등록하기" formData={formData} onSubmitClick={handleSubmit} />
    </>
  );
};

export default SpotRegisterPage;

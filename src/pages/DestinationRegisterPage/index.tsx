import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { postDestinationRequestDto } from "@/api/destination/type";
import useAuth from "@/hooks/useAuth";
import { useDestinationMutation } from "@/hooks/useDestinationMutation";
import DestinationRegisterLayout from "@/layout/DestinationRegisterLayout";

const DestinationRegisterPage = () => {
  const [formData] = useState({
    name: "",
    tags: [],
    location: { address: "", latitude: 0, longitude: 0 },
    pictureLink: "",
    content: "",
  });

  const { auth } = useAuth();
  const { postDestination } = useDestinationMutation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!auth) {
  //     navigate(PAGE_PATH.signIn, { replace: true });
  //   }
  // }, [auth, navigate]);

  const handleSubmit = (data: FieldValues) => {
    if (auth) {
      postDestination.mutate(data as postDestinationRequestDto);
    } else {
      alert("로그인을 해주세요.");
    }
  };

  return (
    <>
      <DestinationRegisterLayout title="여행지 등록하기" formData={formData} onSubmitClick={handleSubmit} />
    </>
  );
};

export default DestinationRegisterPage;

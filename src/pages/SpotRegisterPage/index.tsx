import { useState } from "react";
import SpotRegisterLayout from "@/layout/SpotRegisterLayout";

const SpotRegisterPage = () => {
  const [formData] = useState({
    location: "",
    tags: [],
    address: { address: "", latitude: 0, longitude: 0 },
    pictureLink: "",
  });

  return (
    <>
      <SpotRegisterLayout title="여행지 등록하기" formData={formData} />
    </>
  );
};

export default SpotRegisterPage;

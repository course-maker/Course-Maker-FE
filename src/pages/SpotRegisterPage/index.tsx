import { useState } from "react";
import SpotRegisterLayout from "@/layout/SpotRegisterLayout";

const SpotRegisterPage = () => {
  const [formData, setFormData] = useState({ location: "", tags: [] });
  const temp = () => {
    setFormData({ location: "", tags: [] });
  };
  temp();
  return (
    <>
      <SpotRegisterLayout title="여행지 등록하기" formData={formData} />
    </>
  );
};

export default SpotRegisterPage;

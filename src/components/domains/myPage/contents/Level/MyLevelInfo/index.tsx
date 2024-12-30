import { useState } from "react";
import AllLevelInfoModal from "./AllLevelInfoModal";

const MyLevelInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        내 등급
        <button onClick={() => setIsModalOpen(true)}>?</button>
      </div>

      <AllLevelInfoModal isModalOpen={isModalOpen} onModalClose={() => setIsModalOpen(false)} />
    </>
  );
};
export default MyLevelInfo;

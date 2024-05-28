import { IMAGES } from "@/constants/images";
import Image from "../Image";

const NavigationBar = () => {
  return (
    <>
      <Image imageInfo={IMAGES.courseMakerLogo} />
      //여기 컴포넌트 만들어야 할 수도 (클릭 버튼?) Link 태그 쓰기!!
    </>
  );
};

export default NavigationBar;

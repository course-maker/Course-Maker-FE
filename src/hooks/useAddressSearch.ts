import { useDaumPostcodePopup } from "react-daum-postcode";
import { scriptUrl } from "@/utils/getAddressInfo";
import { getAddressCoords, getFullAddress } from "@/utils/getAddressInfo";
import { Location } from "@/api/destination/type";

export const useAddressSearch = (onChange: (updatedAddress: Location) => void) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = async (data: any) => {
    // fix: type 명시하기
    const mainAddress = data.roadAddress || data.jibunAddress;
    try {
      const coords = await getAddressCoords(mainAddress);

      const updatedAddress = {
        address: getFullAddress(data),
        latitude: coords.getLng(),
        longitude: coords.getLat(),
      };

      onChange(updatedAddress);
    } catch (error) {
      console.error("Kakao address error:", error);
      alert("주소 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleAddressSearch = () => {
    open({ onComplete: handleComplete });
  };

  return { handleAddressSearch };
};

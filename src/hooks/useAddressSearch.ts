import { Location } from "@/api/destination/type";
import { KAKAO_ADDRESS_URL, KAKAO_MAP_SDK_URL_COORDS } from "@/constants/kakaoMapScriptSrc";
import { getAddressCoords, getFullAddress } from "@/utils/getAddressInfo";
import { useCallback } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useKakaoMapScript } from "./useKakaoMapScript";

export const useAddressSearch = (onChange: (updatedAddress: Location) => void) => {
  const scriptLoaded = useKakaoMapScript(KAKAO_MAP_SDK_URL_COORDS);
  const open = useDaumPostcodePopup(KAKAO_ADDRESS_URL);

  const handleComplete = useCallback(
    async (data: any) => {
      const mainAddress = data.roadAddress || data.jibunAddress;
      try {
        const coords = await getAddressCoords(mainAddress);

        const updatedAddress = {
          address: getFullAddress(data),
          latitude: coords.getLat(),
          longitude: coords.getLng(),
        };

        onChange(updatedAddress);
      } catch (error) {
        console.error("Kakao address error:", error);
        alert("주소 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.");
      }
    },
    [onChange],
  );

  const handleAddressSearch = useCallback(() => {
    if (scriptLoaded) {
      open({ onComplete: handleComplete });
    } else {
      alert("지도 스크립트를 로딩 중입니다. 잠시 후 다시 시도해 주세요.");
    }
  }, [scriptLoaded, open, handleComplete]);

  return { handleAddressSearch };
};

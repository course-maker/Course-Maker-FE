import { useDaumPostcodePopup } from "react-daum-postcode";
import { scriptUrl } from "@/utils/getAddressInfo";
import { getAddressCoords, getFullAddress } from "@/utils/getAddressInfo";
import { Address } from "@/components/domains/spotRegister/AddressSearchInput";

export const useAddressSearch = (onChange: (updatedAddress: Address) => void) => {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = async (data: any) => {
    // fix: type 명시하기
    const mainAddress = data.roadAddress || data.jibunAddress;
    const coords = await getAddressCoords(mainAddress);

    const updatedAddress = {
      address: getFullAddress(data),
      latitude: coords.getLng(),
      longitude: coords.getLat(),
    };

    onChange(updatedAddress);
  };

  const handleAddressSearch = () => {
    open({ onComplete: handleComplete });
  };

  return { handleAddressSearch };
};

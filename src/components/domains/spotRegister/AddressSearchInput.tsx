import DestinationDetailsInput from "./DestinationDetailsInput";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import { Location } from "@/api/destination/type";

interface AddressSearchInput {
  selectedAddress: Location;
  onChange: (updatedAddress: Location) => void;
}

const AddressSearchInput = ({ selectedAddress, onChange }: AddressSearchInput) => {
  const { handleAddressSearch } = useAddressSearch(onChange);

  return (
    <>
      <DestinationDetailsInput
        title="여행지 위치"
        buttonName="주소찾기"
        placeholder="주소를 입력해주세요."
        selectedOption={selectedAddress.address}
        onButtonClick={handleAddressSearch}
      />
    </>
  );
};

export default AddressSearchInput;

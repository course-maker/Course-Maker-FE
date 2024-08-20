import { Location } from "@/api/destination/type";
import { useAddressSearch } from "@/hooks/useAddressSearch";
import DestinationDetailsInput from "./DestinationDetailsInput";

interface AddressSearchInput {
  selectedAddress: Location;
  onChange: (updatedAddress: Location) => void;
  disabled?: boolean;
}

const AddressSearchInput = ({ selectedAddress, onChange, disabled }: AddressSearchInput) => {
  const { handleAddressSearch } = useAddressSearch(onChange);

  return (
    <>
      <DestinationDetailsInput
        title="여행지 위치"
        buttonName="주소찾기"
        placeholder="주소를 입력해주세요."
        selectedOption={selectedAddress.address}
        onButtonClick={handleAddressSearch}
        disabled={disabled}
      />
    </>
  );
};

export default AddressSearchInput;

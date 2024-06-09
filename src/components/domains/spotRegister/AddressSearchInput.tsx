// AddressSearchInput.js
import DestinationDetailsInput from "./DestinationDetailsInput";
import { useAddressSearch } from "@/hooks/useAddressSearch";

export type Address = { address: string; latitude: number; longitude: number };

interface AddressSearchInput {
  selectedAddress: Address;
  onChange: (updatedAddress: Address) => void;
}

const AddressSearchInput = ({ selectedAddress, onChange }: AddressSearchInput) => {
  const { handleAddressSearch } = useAddressSearch(onChange);

  return (
    <>
      <DestinationDetailsInput
        title="여행지 위치"
        buttonName="주소 찾기"
        placeholder="주소를 입력해주세요."
        selectedAddress={selectedAddress}
        onButtonClick={handleAddressSearch}
      />
    </>
  );
};

export default AddressSearchInput;

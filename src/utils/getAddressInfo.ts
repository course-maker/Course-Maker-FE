import { loadKakaoScript } from "./loadKakaoScript";

export const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export const getAddressCoords = async (address: string): Promise<kakao.maps.LatLng> => {
  await loadKakaoScript();
  const geoCoder = new window.kakao.maps.services.Geocoder();
  return new Promise((resolve, reject) => {
    geoCoder.addressSearch(address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].x, result[0].y);
        resolve(coords);
      } else {
        reject(status);
      }
    });
  });
};

export const getFullAddress = (data: any) => {
  let fullAddress = data.address;
  let extraAddress = "";

  if (data.addressType === "R") {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }
  return fullAddress;
};

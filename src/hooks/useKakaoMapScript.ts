import { useEffect, useState } from "react";

export const useKakaoMapScript = (src: string) => {
  const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const existingScript = document.getElementById("kakao-maps-sdk");

    if (existingScript) {
      setKakaoMapsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-maps-sdk";
    script.src = src;
    script.defer = true;
    script.onload = () => {
      kakao.maps.load(() => {
        setKakaoMapsLoaded(true);
      });
    };
    script.onerror = () => {
      console.error("Failed to load Kakao Maps SDK");
    };
    document.head.appendChild(script);
  }, [src]);

  return kakaoMapsLoaded;
};

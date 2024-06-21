import { useEffect, useState } from "react";

export const useKakaoMapScript = (src: string) => {
  const [kakaoMapsLoaded, setKakaoMapsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const existingScript = document.getElementById("kakao-maps-sdk");

    const loadScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (existingScript) {
          setKakaoMapsLoaded(true);
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "kakao-maps-sdk";
        script.src = src;
        script.defer = true;
        script.onload = () => {
          kakao.maps.load(() => {
            setKakaoMapsLoaded(true);
            resolve();
          });
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript().catch((error) => {
      console.error("Failed to load Kakao Maps SDK:", error);
    });
  }, [src]);

  return kakaoMapsLoaded;
};

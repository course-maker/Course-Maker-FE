// src/utils/loadKakaoScript.ts
export const loadKakaoScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("kakao-maps-sdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "kakao-maps-sdk";
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services,clusterer,drawing";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Kakao Maps SDK"));
    document.head.appendChild(script);
  });
};

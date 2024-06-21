// fix: 이 코드 지워도 되냐고 지홍님께 여쭤보기
const KAKAOMAP_JAVASCRIPT_APP_KEY = import.meta.env.VITE_KAKAOMAP_JAVASCRIPT_APP_KEY;

export const loadKakaoScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById("kakao-maps-sdk")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "kakao-maps-sdk";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_JAVASCRIPT_APP_KEY}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Kakao Maps SDK"));
    document.head.appendChild(script);
  });
};

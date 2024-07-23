// fix: 이 코드 지워도 되냐고 지홍님께 여쭤보기
const KAKAOMAP_JAVASCRIPT_APP_KEY = import.meta.env.VITE_KAKAOMAP_JAVASCRIPT_APP_KEY;

const loadScript = (id: string, src: string, integrity?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    if (integrity) {
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
    }
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`스크립트 로드 실패: ${src}`));
    document.head.appendChild(script);
  });
};

export const loadKakaoScripts = async (): Promise<void> => {
  if (document.getElementById("kakao-maps-sdk") && window.Kakao) {
    return Promise.resolve();
  }

  try {
    await Promise.all([
      loadScript("kakao-maps-sdk", `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_JAVASCRIPT_APP_KEY}`),
      loadScript(
        "kakao-sdk",
        "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js",
        "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4",
      ),
    ]);
    console.log("카카오 스크립트가 모두 성공적으로 로드되었습니다.");
  } catch (error) {
    console.error("카카오 스크립트 로드 중 오류 발생:", error);
  }
};

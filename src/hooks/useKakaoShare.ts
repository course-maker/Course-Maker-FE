import { useState, useEffect } from "react";

interface ShareMessageProps {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  pageType: "course" | "destination";
}

export const useKakaoShare = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState<boolean>(false);
  const KAKAO_JAVASCRIPT_APP_KEY = import.meta.env.VITE_KAKAOMAP_JAVASCRIPT_APP_KEY;

  useEffect(() => {
    const existingScript = document.getElementById("kakao-sdk");

    if (existingScript) {
      setIsKakaoInitialized(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.defer = true;
    script.onload = () => {
      window.Kakao.init(KAKAO_JAVASCRIPT_APP_KEY);
      setIsKakaoInitialized(true);
      console.log("Kakao SDK가 성공적으로 초기화되었습니다.");
    };
    script.onerror = () => {
      console.error("Failed to load Kakao SDK");
    };
    document.head.appendChild(script);
  }, [KAKAO_JAVASCRIPT_APP_KEY]);

  const shareMessage = ({ id, title, description, imageUrl, pageType }: ShareMessageProps) => {
    if (!isKakaoInitialized) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    const baseUrl = "http://localhost:5173";
    const url = `${baseUrl}/${pageType}/${id}`;

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title || (pageType === "course" ? "코스메이커 코스" : "코스메이커 여행지"),
          description:
            description || (pageType === "course" ? "멋진 코스를 확인해보세요!" : "멋진 여행지를 확인해보세요!"),
          imageUrl: imageUrl || "https://ifh.cc/v-sFhRjF",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: pageType === "course" ? "코스 상세보기" : "여행지 상세보기",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
      console.log("메시지가 성공적으로 공유되었습니다.");
    } catch (error) {
      console.error("메시지 공유 중 오류가 발생했습니다:", error);
    }
  };

  return { shareMessage, isKakaoInitialized };
};

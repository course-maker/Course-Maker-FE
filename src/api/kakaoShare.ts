interface ShareMessageProps {
  id: number | undefined;
  title: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
  pageType: "course" | "destination";
}

function shareMessage({ id, title, description, imageUrl, pageType }: ShareMessageProps): void {
  if (window.Kakao) {
    const kakao = window.Kakao;

    const baseUrl = "http://localhost:5173"; // 실제 배포 시 이 URL을 변경해야 합니다.
    const url = `${baseUrl}/${pageType}/${id}`;

    kakao.Share.sendDefault({
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
  } else {
    console.error("Kakao SDK가 로드되지 않았습니다.");
  }
}

export default shareMessage;

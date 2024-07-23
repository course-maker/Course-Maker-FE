import { getCourseDetail } from "@/api/course";
import { deleteCourseDetail } from "@/api/course";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";

const CourseHeader = () => {
  const { shareMessage, isKakaoInitialized } = useKakaoShare();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: courseDetailData,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  if (isSuccess) {
    courseDetailData;
  } else {
    if (isError) {
      isError;
    }
  } // 코스 상세 데이터 불러오기

  const deleteMutation = useMutation({
    mutationFn: () => deleteCourseDetail(Number(id)),
    onSuccess: () => {
      navigate("/courses");
      alert("코스가 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("코스 삭제 실패:", error);
      alert("코스 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleLike = () => {
    console.log("좋아요 콘솔 확인");
    // 좋아요 기능 구현
  };

  const handleBookmark = () => {
    console.log("북마크 콘솔 확인");
    // 북마크 기능 구현
  };

  const handleKaKaoShare = () => {
    if (isKakaoInitialized) {
      shareMessage({
        id: courseDetailData?.id,
        title: courseDetailData?.title,
        description: courseDetailData?.content,
        imageUrl: courseDetailData?.pictureLink,
        pageType: "course",
      });
    } else {
      console.error("Kakao SDK가 아직 초기화되지 않았습니다.");
    }
  };

  const handleLinkCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("링크가 복사되었습니다.");
    } catch (err) {
      console.error("링크 복사에 실패했습니다:", err);
      alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleEdit = () => {
    navigate(`/course/${courseDetailData?.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 코스를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <Header
      title={courseDetailData?.title}
      nickname={courseDetailData?.member.nickname}
      tags={["축제", "연인", "자연속휴식", "부모님"]}
      viewCount={4.2}
      onLike={handleLike}
      onBookmark={handleBookmark}
      onKaKaoShare={handleKaKaoShare}
      onLinkCopy={handleLinkCopy}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default CourseHeader;

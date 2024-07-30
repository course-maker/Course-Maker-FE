import { getCourseDetail, deleteCourseDetail } from "@/api/course";
import { useKakaoShare } from "@/hooks/useKakaoShare";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";

const CourseHeader = () => {
  const { shareMessage, isKakaoInitialized } = useKakaoShare();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

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
  };

  const handleBookmark = () => {
    console.log("북마크 콘솔 확인");
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
      tags={courseDetailData?.tags || []}
      viewCount={4.2}
      onLike={handleLike}
      onBookmark={handleBookmark}
      onKaKaoShare={handleKaKaoShare}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default CourseHeader;

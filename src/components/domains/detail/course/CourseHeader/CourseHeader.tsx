import { deleteCourseDetail, getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { authState } from "@/recoil/authAtom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../../Header/Header";

const CourseHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAuth] = useRecoilState(authState);

  const fetchCourseDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getCourseDetail(Number(id), options);
  };

  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData", id],
    queryFn: fetchCourseDetail,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

  const deleteMutation = useMutation({
    mutationFn: () => deleteCourseDetail(Number(id)),
    onSuccess: () => {
      navigate("/search", { replace: true });
      alert("코스가 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("코스 삭제 실패:", error);
      alert("코스 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleEdit = () => {
    navigate(`/course/${courseDetailData?.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 코스를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const headerData = {
    title: courseDetail.title,
    nickname: courseDetail.member.nickname,
    averageRating: courseDetail.averageRating,
    isMyPost: courseDetail.isMyCourse,
    tags: courseDetail.tags,

    actionData: {
      id: courseDetail.id,
      title: courseDetail.title,
      content: courseDetail.content,
      pictureLink: courseDetail.pictureLink,
      isMyWish: courseDetail.isMyWishCourse,
      isMyLike: courseDetail.isMyLikeCourse,
    },
  };

  return <Header type="course" data={headerData} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default CourseHeader;

import { deleteCourseDetail, getCourseDetail } from "@/api/course";
import { defaultCourseDetail } from "@/constants/defaultValues";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";

const CourseHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: courseDetailData } = useQuery({
    queryKey: ["courseDetailData"],
    queryFn: () => getCourseDetail(Number(id)),
    retry: 0,
  });

  const courseDetail = courseDetailData ?? defaultCourseDetail;

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

  const handleEdit = () => {
    navigate(`/course/${courseDetailData?.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 코스를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  return <Header type="course" data={courseDetail} onEdit={handleEdit} onDelete={handleDelete} />;
};

export default CourseHeader;

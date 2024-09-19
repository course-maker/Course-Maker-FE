import { deleteDestinationDetail, getDestinationApi } from "@/api/destination";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";

const DestinationHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData"],
    queryFn: () => getDestinationApi(Number(id)),
    retry: 0,
  });

  const destinationDetail = destinationDetailData ?? defaultDestinationDetail;

  const deleteMutation = useMutation({
    mutationFn: () => deleteDestinationDetail(Number(id)),
    onSuccess: () => {
      navigate("/search");
      alert("코스가 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("코스 삭제 실패:", error);
      alert("코스 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleEdit = () => {
    navigate(`/destination/${destinationDetailData?.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 목적지를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const headerData = {
    title: destinationDetail.name,
    nickname: destinationDetail.nickname,
    reviewCount: destinationDetail.reviewCount,
    isMyPost: destinationDetail.isMyDestination,
    tags: destinationDetail.tags,

    actionData: {
      id: destinationDetail.id,
      title: destinationDetail.name,
      content: destinationDetail.content,
      pictureLink: destinationDetail.pictureLink,
      isMyWish: destinationDetail.isMyWishDestination,
      isMyLike: destinationDetail.isMyLikeDestination,
    },
  };

  return (
    <>
      <Header type="destination" data={headerData} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};
export default DestinationHeader;

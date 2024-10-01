import { deleteDestinationDetail, getDestinationApi } from "@/api/destination";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { authState } from "@/recoil/authAtom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Header from "../../Header/Header";

const DestinationHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAuth] = useRecoilState(authState);

  const fetchDestinationDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getDestinationApi(Number(id), options);
  };

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", id],
    queryFn: fetchDestinationDetail,
  });

  const destinationDetail = destinationDetailData ?? defaultDestinationDetail;

  const deleteMutation = useMutation({
    mutationFn: () => deleteDestinationDetail(Number(id)),
    onSuccess: () => {
      navigate("/search", { replace: true });
      alert("여행지가 성공적으로 삭제되었습니다.");
    },
    onError: (error) => {
      console.error("여행지 삭제 실패:", error);
      alert("여행지 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleEdit = () => {
    if (isAuth) {
      navigate(`/destination/${destinationDetailData?.id}/edit`);
    } else {
      alert("로그인 후 이용 가능합니다.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 여행지를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };

  const headerData = {
    title: destinationDetail.name,
    nickname: destinationDetail.nickname,
    averageRating: destinationDetail.averageRating,
    isMyPost: destinationDetail.isMyDestination,
    tags: destinationDetail.tags,
    isApiData: destinationDetail.isApiData,

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

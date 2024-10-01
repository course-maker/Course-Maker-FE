import { getDestinationApi } from "@/api/destination";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { authState } from "@/recoil/authAtom";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Description from "../../Description/Description";
import styles from "./DestinationInfo.module.scss";

const cx = classNames.bind(styles);

const DestinationInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [isAuth] = useRecoilState(authState);

  const fetchDestinationDetail = () => {
    const options = { requireAuth: !!isAuth };
    return getDestinationApi(Number(id), options);
  };

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", id],
    queryFn: fetchDestinationDetail,
    retry: 0,
  });

  const destinationDetail = destinationDetailData ?? defaultDestinationDetail;

  return (
    <div className={cx("container")}>
      {destinationDetail.isApiData && (
        <div className={cx("api-data")}>
          <p className={cx("api-data-content")}>{destinationDetail.apiContent}</p>
          <span className={cx("api-data-info")}>한국관광공사가 제공하는 tour API를 통해 제공되는 정보입니다.</span>
        </div>
      )}
      <div className={cx("description")}>
        <Description content={destinationDetail.content} />
      </div>
    </div>
  );
};
export default DestinationInfo;

import { getDestinationApi } from "@/api/destination";
import { defaultDestinationDetail } from "@/constants/defaultValues";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import Description from "../../Description/Description";
import styles from "./DestinationInfo.module.scss";

const cx = classNames.bind(styles);

const DestinationInfo = () => {
  const { id } = useParams<{ id: string }>();

  const { data: destinationDetailData } = useQuery({
    queryKey: ["destinationDetailData", id],
    queryFn: () => getDestinationApi(Number(id)),
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

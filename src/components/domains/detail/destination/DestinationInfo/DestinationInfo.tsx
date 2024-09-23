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
    <>
      <div className={cx("description")}>
        <Description content={destinationDetail.content} />
      </div>
    </>
  );
};
export default DestinationInfo;

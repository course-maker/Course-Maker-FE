// import { getCourseDetail } from "@/api/course";
// import { defaultCourseDetail } from "@/constants/defaultValues";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "react-router-dom";
import DestinationCard from "./DestinationCard";

const TravelCourseOnMap = () => {
  // const { id } = useParams<{ id: string }>();

  // const { data: courseDetailData } = useQuery({
  //   queryKey: ["courseDetailData", id],
  //   queryFn: () => getCourseDetail(Number(id)),
  //   retry: 0,
  // });

  // const courseDetail = courseDetailData ?? defaultCourseDetail;

  return (
    <>
      <p>여행지를 클릭하면 여행지 위치를 확인할 수 있습니다.</p>
      <DestinationCard number={1} title="해동용궁사" address="부산 기장군 기장읍 용궁길 86 해동용궁사" />
      <DestinationCard
        number={12}
        title="해동용궁사해동용궁사해동용궁사"
        address="부산 기장군 기장읍 용궁길 86 해동용궁사부산 기장군 기장읍 용궁길 86 해동용궁사"
      />
    </>
  );
};
export default TravelCourseOnMap;

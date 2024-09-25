import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TravelCourseOnMap from "./TravelCourseOnMap";

interface DestinationsInputControllerProps<ControlType extends FieldValues> {
  formFieldName: Path<ControlType>;
  control: Control<ControlType>;
  disabled?: boolean;
}

const DestinationsInputController = <ControlType extends FieldValues>({
  formFieldName,
  control,
  disabled,
}: DestinationsInputControllerProps<ControlType>) => {
  // const mock2 = {};
  // const mock = {
  //   content: "<p>123</p>",
  //   courseDestinations: [
  //     {
  //       visitOrder: 1,
  //       date: 1,
  //       destination: {
  //         id: 1,
  //         nickname: "coursemaker",
  //         name: "역시 부산은 해운대!",
  //         views: 100,
  //         averageRating: 4.5,
  //         content: "해운대 물이 깨끗하고, 친구들과 여행하기 너무 좋았어요!",
  //         isApiData: false,
  //         isMyDestination: true,
  //         isMyLikeDestination: true,
  //         isMyWishDestination: true,
  //         likeCount: 50,
  //         location: {
  //           address: "부산광역시 해운대구 우동",
  //           longitude: 128.934,
  //           latitude: 35.169,
  //         },
  //         pictureLink: "http://example.com/coursemaker.jpg",
  //         reviewCount: 60,
  //         tags: [
  //           {
  //             id: 1,
  //             name: "연인",
  //             description: "그래서, 커플이시겠다?",
  //           },
  //         ],
  //         wishCount: 70,
  //       },
  //     },
  //   ],
  //   duration: 2,
  //   pictureLink: "https://myawsbucket0154.s3.ap-northeast-2.amazonaws.com/8f790818-cbf5-4f2c-b695-eae5c8cae422.png",
  //   tags: [
  //     {
  //       id: 9,
  //       name: "어린이여행",
  //       description: "동행",
  //     },
  //     {
  //       id: 8,
  //       name: "무장애여행",
  //       description: "동행",
  //     },
  //     {
  //       id: 11,
  //       name: "연인/배우자",
  //       description: "동행",
  //     },
  //   ],
  //   title: "123",
  //   travelerCount: 2,
  //   travelType: 0,
  // };

  return (
    <Controller
      name={formFieldName}
      control={control}
      render={({ field }) => <TravelCourseOnMap courseDetail={field.value} disabled={disabled} {...field} />}
    />
  );
};

export default DestinationsInputController;

import { Destination } from "@/api/destination/type";
import { Courses } from "@/api/course/type";

//여행지 초기값 설정
export const initialDestination: Destination = {
  id: 0,
  name: "",
  location: "",
  pictureLink: "",
  content: "",
};

//코스 초기값 설정
export const initialCourse: Courses = {
  id: 0,
  title: "",
  content: "",
  views: 0,
  duration: 0,
  travelerCount: 0,
  travelType: 0,
  pictureLink: "",
  courseDestinations: [],
  courseTags: [],
  member: {
    nickname: "",
  },
};

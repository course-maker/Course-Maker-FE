export const defaultCourseDetail = {
  id: 0,
  title: "",
  content: "",
  views: 0,
  duration: 0,
  travelerCount: 0,
  travelType: 0,
  pictureLink: "",
  courseDestinations: [
    {
      visitOrder: 0,
      date: 0,
      destination: {
        id: 0,
        nickname: "",
        name: "",
        views: 0,
        tags: [],
        location: { address: "", longitude: 0, latitude: 0 },
        pictureLink: "",
        content: "",
        averageRating: 0,
        isMyDestination: false,
        disabled: false,
        isApiData: false,
        wishCount: 0,
        reviewCount: 0,
        likeCount: 0,
        isMyWishDestination: false,
        isMyLikeDestination: false,
      },
    },
  ],
  tags: [],
  member: {
    nickname: "",
  },
  isMyCourse: false,
  averageRating: 0,
  wishCount: 0,
  reviewCount: 0,
  likeCount: 0,
  isMyWishCourse: false,
  isMyLikeCourse: false,
};

export const defaultDestinationDetail = {
  id: 0,
  nickname: "",
  name: "",
  views: 0,
  tags: [],
  location: {
    address: "",
    longitude: 0,
    latitude: 0,
  },
  pictureLink: "",
  content: "",
  averageRating: 0,
  isMyDestination: false,
  disabled: null,
  isApiData: false,
  wishCount: 0,
  reviewCount: 0,
  likeCount: 0,
  isMyWishDestination: false,
  isMyLikeDestination: false,
};

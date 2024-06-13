export interface Tag {
  id: number;
  name: string;
  description: string;
}

export interface Location {
  address: string;
  longitude: number;
  latitude: number;
}

export interface DestinationDto {
  id: number;
  nickname: string;
  name: string;
  tags: Tag[];
  location: Location;
  pictureLink: string;
  content: string;
}

export interface CourseDestination {
  visitOrder: number;
  date: number;
  destination: DestinationDto;
}

export interface postCourse {
  title: string;
  content: string;
  duration: number;
  travelerCount: number;
  travelType: number;
  pictureLink: string;
  courseDestinations: CourseDestination[];
  tags: Tag[];
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/commons/Card/Card";
import Section from "@/components/commons/Section/Section";
import Banner from "@/components/commons/Banner/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { Navigation, Autoplay } from "swiper";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { bannerData, bannerItemsData } from "./data.js";
import "swiper/css";
// import "swiper/css/navigation";

import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
// import { getDestinations } from "@/api/destination";
// import { Destination } from "@/api/destination/type";
import { getCourse } from "@/api/course";
import { Course } from "@/api/course/type";
// import { initialDestination } from "@/constants/initialValues";
// SwiperCore.use([Navigation, Autoplay]);

const cx = classNames.bind(styles);

const bannerItems = bannerItemsData;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [course, setCourse] = useState<Course[]>([]);

  const navigate = useNavigate();
  // 태그 정보
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await getTag();
        setTagsData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  //코스 정보
  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const response = await getCourse(`record=8&page=1&orderBy=NEWEST`);
        setCourse(response.contents);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, []);

  console.log(tagsData);

  return (
    <div data-testid="home-page">
      <Section title="" className={cx("container")}>
        <div className={cx("banner-container")}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 1000 }}
            className={cx("swiper-container")}>
            {bannerData.map((item) => (
              <SwiperSlide key={item.id}>
                <Banner image={item.image} size="x-large" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className={cx("banner-container")}>
          <button className={cx("arrow-button", "left")}>{"<"}</button>
          <Banner image={bannerItems.small[0].image} title={bannerItems.small[0].title} size="x-large" />
          <button className={cx("arrow-button", "right")}>{">"}</button>
        </div> */}
      </Section>
      <Section title="어떤 여행을 할까요?">
        <div className={cx("banner-container")}>
          <button className={cx("arrow-button", "left")}>{"<"}</button>
          {tagsData.map((item) => (
            <Banner
              key={item.id}
              image={bannerItems.small[item.id].image}
              title={item.name}
              onClick={() => navigate(`course/${item.id}`)}
              size="small"
            />
          ))}
          <button className={cx("arrow-button", "right")}>{">"}</button>
        </div>
        <div className={cx("banner-container")}>
          {bannerItems.large.map((item) => (
            <Banner key={item.id} image={item.image} title={item.title} subtitle={item.subtitle} size="large" />
          ))}
        </div>
      </Section>

      <Section title="코스메이커’S PICK">
        <div className={cx("card_container")}>
          {!loading &&
            course &&
            course.slice(0, 4)?.map((item) => <Card key={item.id} name={"코스 찾기"} item={item} loading={false} />)}
        </div>
      </Section>
      <Section title="요즘 인기있는 코스">
        <div className={cx("card_container")}>
          {course &&
            course.slice(0, 4)?.map((item) => <Card key={item.id} name={"코스 찾기"} item={item} loading={false} />)}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

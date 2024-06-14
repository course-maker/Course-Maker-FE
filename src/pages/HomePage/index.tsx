import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/commons/Card/Card";
import Section from "@/components/commons/Section/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { bannerData, bannerItemsData } from "./data.js"; // Ensure this data includes 'title'
import "swiper/css";

import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import { getCourse } from "@/api/course";
import { Course } from "@/api/course/type";
import Banner from "@/components/commons/Banner/Banner";

const cx = classNames.bind(styles);

const bannerItems = bannerItemsData;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [course, setCourse] = useState<Course[]>([]);

  const navigate = useNavigate();

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
      </Section>
      <Section title="어떤 여행을 할까요?">
        <div className={cx("banner-container")}>
          <button className={cx("arrow-button", "left")}>{"<"}</button>
          {tagsData.slice(0, 6).map((item) => (
            <Banner
              key={item.id}
              image={bannerItems.small[item.id - 1]?.image}
              title={item.name}
              onClick={() => navigate(`course/${item.id}`)}
              size="small"
            />
          ))}
          <button className={cx("arrow-button", "right")}>{">"}</button>
        </div>
        <div className={cx("banner-container")}>
          {bannerItems.large.map((item) => (
            <Banner
              key={item.id}
              image={item.image}
              title={item.title ?? "Default Title"}
              subtitle={item.subtitle}
              size="large"
            />
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

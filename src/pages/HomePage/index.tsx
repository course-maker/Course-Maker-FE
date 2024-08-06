import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/commons/Card/Card";
import Section from "@/components/commons/Section/Section";
import SearchBar from "@/components/commons/SearchBar";
import Banner from "@/components/commons/Banner/Banner";
import Image from "@/components/commons/Image";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { bannerItemsData } from "./data.js"; // Ensure this data includes 'title'

import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import { getCourse } from "@/api/course";
import { Course } from "@/api/course/type";

const cx = classNames.bind(styles);

const bannerItems = bannerItemsData;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([tagsData]);
  const [course, setCourse] = useState<Course[]>([]);

  const navigate = useNavigate();
  // console.log(tagsData);
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
        <SearchBar />
      </Section>

      <Section title="어떤 여행을 할까요?">
        <div className={cx("banner-container")}>
          {bannerItems.small.map((item) => (
            <div
              className={cx("banner")}
              key={item.id}
              onClick={() => navigate(`search`, { state: { propsTagName: item.title } })}>
              <Image imageInfo={item.image} />
              <h1>{item.title}</h1>
            </div>
          ))}
        </div>
        <div className={cx("banner-container")}>
          {bannerItems.large.map((item) => (
            <Banner
              key={item.id}
              image={item.image}
              title={item.title ?? "Default Title"}
              subtitle={item.subtitle}
              size="large"
              onClick={() => navigate(item.url)}
            />
          ))}
        </div>
      </Section>

      <Section title="코스메이커 추천">
        <div className={cx("card_container")}>
          {!loading &&
            course &&
            course.slice(0, 4)?.map((item) => <Card key={item.id} name={"코스 찾기"} item={item} loading={false} />)}
        </div>
        <div></div>
      </Section>
    </div>
  );
};

export default HomePage;

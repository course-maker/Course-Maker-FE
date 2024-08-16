import { useState, useEffect, lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Section from "@/components/commons/Section/Section";
import ItemBox from "@/components/commons/ItemBox/ItemBox";
import SearchBar from "@/components/commons/SearchBar";
import Banner from "@/components/commons/Banner/Banner";
import Image from "@/components/commons/Image";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { busanData, bannerItemsData } from "./data.js";

import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import { getCourse } from "@/api/course";
import { Course } from "@/api/course/type";
import { useQueriesLoading } from "@/hooks/useQueriesLoading.ts";
import { useGetCourseQuery } from "@/hooks/course/queries/useGetCourseQuery.ts";
const Card = lazy(() => import("@/components/commons/Card/Card"));
const cx = classNames.bind(styles);

const bannerItems = bannerItemsData;

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  const { isLoading, courseData } = useGetCourseQuery("record=4&page=1&orderBy=POPULAR");
  const isQueriesLoading = useQueriesLoading();

  if (!isQueriesLoading && !loading && !isLoading) {
    console.log("안됨");
    console.log(tagsData);
    console.log(course);
  }
  console.log(courseData);

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
          <Suspense fallback={<LoadingSkeleton />}>
            {busanData.map((item) => (
              <Card key={item.id} name={"코스 찾기"} id={item.id}>
                <div className={cx("card-image-container")}>
                  <img loading="lazy" alt={item.location} src={item.image} className={cx("card-image")} />
                  <div className={cx("card-content")}>
                    <span className={cx("card-title")}>{item.name}</span>
                    <span className={cx("card-subtitle")}>{item.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </Suspense>
        </div>
      </Section>

      <Section title="요즘 인기있는 코스">
        <div className={cx("card_container")}>
          <Suspense fallback={<LoadingSkeleton />}>
            {busanData.map((item) => (
              <Card key={item.id} name={"코스 찾기"} id={item.id}>
                <div className={cx("card-image-container")}>
                  <img loading="lazy" alt={item.location} src={item.image} className={cx("card-image")} />
                  <div className={cx("card-content")}>
                    <ItemBox
                      color="white"
                      name={"코스 찾기"}
                      title={item.location}
                      travelerCount={item.icons.member}
                      views={item.icons.member}
                      duration={item.icons.calendar}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </Suspense>
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

const LoadingSkeleton = () => (
  <>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className={cx("card-container")}>
        <Skeleton height={330} width={250} className={cx("card-image")} />
        <div className={cx("card-content")}>
          <Skeleton count={3} />
        </div>
      </div>
    ))}
  </>
);

import { lazy, Suspense } from "react";
import { useRecoilState } from "recoil";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import Section from "@/components/commons/Section/Section";
import ItemBox from "@/components/commons/ItemBox/ItemBox";
import SearchBar from "@/components/commons/SearchBar";
import Banner from "@/components/commons/Banner/Banner";
import Image from "@/components/commons/Image";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { bannerItemsData } from "./data.js";
import { useGetCourseQuery } from "@/hooks/course/queries/useGetCourseQuery";
import { DestinationBadgesState } from "@/recoil/serviceAtom";
import { tagResponseDto } from "@/api/tag/type";

const Card = lazy(() => import("@/components/commons/Card/Card"));
const cx = classNames.bind(styles);
const bannerItems = bannerItemsData;

const HomePage = () => {
  const { courseData: coursePopularData } = useGetCourseQuery("record=4&page=1&orderBy=POPULAR");
  const { courseData: courseRatingData } = useGetCourseQuery("record=4&page=2&orderBy=RATING");
  const [DestinationBadges, setDestinationBadgesState] = useRecoilState(DestinationBadgesState);
  const navigate = useNavigate();

  const handleClick = (tag: tagResponseDto) => {
    setDestinationBadgesState([...DestinationBadges, tag]);
    navigate(`search`, { state: { propsTagName: tag.name } });
  };
  return (
    <div data-testid="home-page">
      <Section title="" className={cx("container")}>
        <SearchBar />
      </Section>

      <Section title="어떤 여행을 할까요? ">
        <div className={cx("banner-container")}>
          {bannerItems.small.map((item) => (
            <div className={cx("banner")} key={item.id} onClick={() => handleClick(item.tag)}>
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
            {courseRatingData?.contents.map((item) => (
              <Card key={item.id} name={"코스 찾기"} id={item.id}>
                <div className={cx("card-image-container")}>
                  <img loading="lazy" alt={item.title} src={item.pictureLink} className={cx("card-image")} />
                  <div className={cx("card-content")}>
                    <span className={cx("card-title")}>{item.content}</span>
                    <span className={cx("card-subtitle")}>{item.title}</span>
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
            {coursePopularData?.contents.map((item) => (
              <Card key={item.id} name={"코스 찾기"} id={item.id}>
                <div className={cx("card-image-container")}>
                  <img loading="lazy" alt={item.title} src={item.pictureLink} className={cx("card-image")} />
                  <div className={cx("card-content")}>
                    <ItemBox
                      color="white"
                      name={"코스 찾기"}
                      title={item.title}
                      travelerCount={item.travelerCount}
                      views={item.views}
                      duration={item.duration}
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

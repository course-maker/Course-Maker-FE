import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

// import BadgeLists from "@/components/commons/BadgeLists/BadgeLists";
import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card2 from "@/components/commons/Card/Card2";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";
import SearchBar from "@/components/commons/SearchBar";

import { useGetCourseQuery } from "@/hooks/course/queries/useGetCourseQuery";
import { useBadgeListViewModel } from "@/hooks/business/useBadgeListViewModel";
import { getTag } from "@/api/tag";
import { tagResponseDto } from "@/api/tag/type";
import { getDestinations } from "@/api/destination";
import { Destination } from "@/api/destination/type";
import { getCourse } from "@/api/course";
import { Courses } from "@/api/course/type";

import groupTags from "@/utils/groupTags";
import { initialDestination, initialCourse, initialSortOrder, initialPage } from "@/constants/initialValues";
const cx = classNames.bind(styles);

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("여행지 찾기");
  const [selectedCourseBadges, setSelectedCourseBadges] = useState<tagResponseDto[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<tagResponseDto[]>([]);
  const [lists, setLists] = useState<Destination>(initialDestination);
  const [course, setCourse] = useState<Courses>(initialCourse);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const { isCourseLoading, courseData } = useGetCourseQuery("record=4&page=1&orderBy=POPULAR");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollPositionRef = useRef(0);
  const location = useLocation();
  const { propsTagName } = location.state || {};

  if (loading || isCourseLoading) {
    console.log("안됨");
    console.log(tagsData);
    console.log(course);
  }
  console.log(courseData);
  console.log("test");
  console.log(useBadgeListViewModel());

  const selectedTagsInfo = (params: tagResponseDto[]) => {
    if (tagsData.length > 0 && params.length > 0) {
      const tagIds = tagsData
        .filter((tag) => params.includes(tag))
        .map((tag) => tag.id)
        .map((id) => `tagIds=${id}`)
        .join("&");
      return tagIds ? `&${tagIds}` : "";
    }
    return "";
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setSortOrder((prev) => {
      return {
        ...prev,
        ...(activeTab === "코스 찾기" ? { course: value } : { destination: value }),
      };
    });
  };

  const fetchMoreData = useCallback(() => {
    setPage((prevPage) => {
      return {
        ...prevPage,
        ...(activeTab === "코스 찾기" ? { course: prevPage.course + 1 } : { destination: prevPage.destination + 1 }),
      };
    });
  }, [activeTab]);

  const loadMoreObserver = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !hasMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, fetchMoreData, hasMore],
  );

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  //여행지 찾기
  useEffect(() => {
    const tags = selectedTagsInfo(selectedDestinationBadges);
    const fetchLists = async () => {
      saveScrollPosition();
      setLoading(true);
      try {
        const response = await getDestinations(
          `record=8&page=${page.destination}&orderBy=${sortOrder.destination}${tags}`,
        );

        setLists((prev) => ({
          ...response,
          contents: page.destination === 1 ? response.contents : [...prev.contents, ...response.contents],
        }));
        if (response.contents.length < 8) {
          setHasMore(false);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (hasMore) {
          window.scrollTo(0, scrollPositionRef.current);
        }
      }
    };
    if (activeTab === "여행지 찾기") {
      fetchLists();
    }
  }, [selectedDestinationBadges, sortOrder.destination, page.destination, activeTab, hasMore]);

  //코스 찾기
  useEffect(() => {
    const tags = selectedTagsInfo(selectedCourseBadges);
    const fetchLists = async () => {
      saveScrollPosition();
      setLoading(true);
      try {
        const response = await getCourse(`record=8&page=${page.course}&orderBy=${sortOrder.course}${tags}`);
        setCourse((prev) => ({
          ...response,
          contents: page.course === 1 ? response.contents : [...prev.contents, ...response.contents],
        }));
        if (response.contents.length < 8) {
          setHasMore(false);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (hasMore) {
          window.scrollTo(0, scrollPositionRef.current);
        }
      }
    };
    if (activeTab === "코스 찾기") {
      fetchLists();
    }
  }, [selectedCourseBadges, sortOrder.course, page.course, activeTab, hasMore]);

  useEffect(() => {
    setPage(initialPage);
    setHasMore(true);
    scrollPositionRef.current = 0;
  }, [activeTab, selectedCourseBadges, selectedDestinationBadges, sortOrder]);

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
    if (propsTagName && tagsData.length > 0) {
      const matchedTag = tagsData.find((tag) => tag.name === propsTagName);
      if (matchedTag) {
        setSelectedDestinationBadges([matchedTag]);
      }
    }
  }, [propsTagName, tagsData]);

  const groupedTags = groupTags(tagsData);

  return (
    <div className={cx("search-page")}>
      <Section title="" className={cx("container")}>
        <SearchBar color="gray" />
      </Section>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section className={cx("tab-container")}>
        {/* <BadgeLists selectedBadges={field.value} onChange={field.onChange} />; */}
        {Object.entries(groupedTags).map(([description, tags]) => (
          <BadgeList
            key={description}
            title={description}
            tags={tags}
            selectedBadges={activeTab === "코스 찾기" ? selectedCourseBadges : selectedDestinationBadges}
            setSelectedBadges={activeTab === "코스 찾기" ? setSelectedCourseBadges : setSelectedDestinationBadges}
          />
        ))}
      </Section>

      <div className={cx("option-container")}>
        <span>전체 {activeTab === "코스 찾기" ? course?.contents?.length : lists?.contents?.length}개</span>
        <div>
          <select
            name="HeadlineAct"
            id="HeadlineAct"
            className={cx("select-box")}
            onChange={handleSortChange}
            value={sortOrder[activeTab === "코스 찾기" ? "course" : "destination"]}>
            <option value="NEWEST">최신순</option>
            <option value="POPULAR">인기순</option>
            <option value="VIEWS">조회수순</option>
            <option value="RATING">별점순</option>
          </select>
        </div>
      </div>

      <Section title="">
        <div className={cx("card_container")}>
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <Card2 key={index} name={activeTab} loading={true} item={null} />
              ))
            : (activeTab === "코스 찾기" ? course.contents : lists.contents)?.map((item) => (
                <Card2 key={item.id} name={activeTab} item={item} loading={false} />
              ))}
        </div>
        <div ref={loadMoreObserver} style={{ height: 20 }}></div>
      </Section>
    </div>
  );
};

export default SearchPage;

import { useState, useEffect, useRef, useCallback } from "react";

import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";

import BadgeList from "@/components/commons/BadgeList/BadgeList";
import Section from "@/components/commons/Section/Section";
import Card from "@/components/commons/Card/Card";
import TabNavigation from "@/components/commons/TabNavigation/TabNavigation";

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
  const [activeTab, setActiveTab] = useState("코스 찾기");
  const [selectedCourseBadges, setSelectedCourseBadges] = useState<string[]>([]);
  const [selectedDestinationBadges, setSelectedDestinationBadges] = useState<string[]>([]);
  const [lists, setLists] = useState<Destination>(initialDestination);
  const [course, setCourse] = useState<Courses>(initialCourse);
  const [tagsData, setTagsData] = useState<tagResponseDto[]>([]);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef(0);

  //선택한 태그 정보와 일치하는 TagData id값 추출
  const selectedTagsInfo = (params) => {
    if (tagsData.length > 0 && params.length > 0) {
      const tagIds = tagsData
        .filter((tag) => params.includes(tag.name))
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
    (node) => {
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

  // 스크롤 위치 저장
  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };
  console.log(scrollPositionRef.current);

  // 여행지 정보
  useEffect(() => {
    const tags = selectedTagsInfo(selectedDestinationBadges);
    const fetchLists = async () => {
      saveScrollPosition();
      setLoading(true);
      try {
        const response = await getDestinations(
          `record=2&page=${page.destination}&orderBy=${sortOrder.destination}${tags}`,
        );

        setLists((prev) => ({
          ...response,
          contents: page.destination === 1 ? response.contents : [...prev.contents, ...response.contents],
        }));
        if (response.contents.length < 2) {
          setHasMore(false);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        } else {
          // window.scrollTo(0, scrollPositionRef.current);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        if (hasMore) {
          window.scrollTo(0, scrollPositionRef.current); // 스크롤 위치 복원
        }
      }
    };
    if (activeTab === "여행지 찾기") {
      fetchLists();
    }
  }, [selectedDestinationBadges, sortOrder.destination, page.destination, activeTab, hasMore]);

  // 코스 정보
  useEffect(() => {
    const tags = selectedTagsInfo(selectedCourseBadges);
    const fetchLists = async () => {
      saveScrollPosition();
      setLoading(true);
      try {
        const response = await getCourse(`record=2&page=${page.course}&orderBy=${sortOrder.course}${tags}`);
        setCourse((prev) => ({
          ...response,
          contents: page.course === 1 ? response.contents : [...prev.contents, ...response.contents],
        }));
        if (response.contents.length < 2) {
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
          window.scrollTo(0, scrollPositionRef.current); // 스크롤 위치 복원
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

  const groupedTags = groupTags(tagsData);

  return (
    <div className={cx("search-page")}>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <Section title="" className={cx("tab-container")}>
        {Object.entries(groupedTags).map(([description, tags]) => (
          <BadgeList
            key={description}
            title={description}
            tags={tags}
            activeTab={activeTab}
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
                <Card key={index} name={activeTab} loading={true} item={null} />
              ))
            : (activeTab === "코스 찾기" ? course.contents : lists.contents)?.map((item) => (
                <Card key={item.id} name={activeTab} item={item} loading={false} />
              ))}
        </div>
        <div ref={loadMoreObserver} style={{ height: 20 }}></div>
      </Section>
    </div>
  );
};

export default SearchPage;

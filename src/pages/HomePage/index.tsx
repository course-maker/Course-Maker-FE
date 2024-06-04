import Card from "@/components/commons/Card/Card";
import Section from "@/components/commons/Section/Section";
import Banner from "@/components/commons/Banner/Banner";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import data from "./data.json";

const cx = classNames.bind(styles);

interface Icons {
  [key: string]: number;
}

interface MockData {
  id: number;
  title: string;
  location: string;
  icons: Icons;
}
const mockData: MockData[] = data.mockData;
const bannerItems = data.bannerItems;

const HomePage = () => {
  return (
    <div data-testid="home-page">
      <Section title="" className={cx("container")}>
        <div className={cx("banner-container", "banner-top")}>
          <button className={cx("arrow-button", "left")}>{"<"}</button>
          <Banner item={bannerItems[0]} />
          <button className={cx("arrow-button", "right")}>{">"}</button>
        </div>
      </Section>
      <Section title="어떤 여행을 할까요?">
        <div className={cx("banner-container")}>
          <button className={cx("arrow-button", "left")}>{"<"}</button>
          {bannerItems.small.map((item) => (
            <Banner key={item.id} image={item.image} title={item.title} subtitle={item.subtitle} size="small" />
          ))}
          <button className={cx("arrow-button", "right")}>{">"}</button>
        </div>
        <div className={cx("banner-container")}>
          {bannerItems.large.map((item) => (
            <Banner key={item.id} image={item.image} title={item.title} subtitle={item.subtitle} size={item.size} />
          ))}
        </div>
      </Section>

      <Section title="코스메이커’S PICK">
        <div className={cx("card_container")}>
          {mockData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </Section>
      <Section title="요즘 인기있는 코스">
        <div className={cx("card_container")}>
          {mockData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

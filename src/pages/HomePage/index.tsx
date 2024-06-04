import Card from "@/components/commons/Card/Card";
import Section from "@/components/commons/Section/Section";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";

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

const mockData: MockData[] = [
  {
    id: 0,
    title: "부산 아쿠아리움",
    location: "부산 해운대구 해운대해변로 266",
    icons: {
      blackHeart: 2,
      heart: 2,
    },
  },
  {
    id: 1,
    title: "해운대",
    location: "부산 해운대구 해운대해변로 280",
    icons: {
      thumbsUp: 102,
      heart: 21,
      star: 222,
    },
  },
  {
    id: 2,
    title: "부산 영도",
    location: "부산 해운대구 해운대해변로 299",
    icons: {
      heart: 22,
      location: 27,
      star: 12,
    },
  },
  {
    id: 3,
    title: "부산 광안리",
    location: "부산 해운대구 해운대해변로 388",
    icons: {
      thumbsUp: 72,
      heart: 827,
      star: 1332,
    },
  },
];

const HomePage = () => {
  return (
    <div>
      <div>banner</div>
      <Section title="코스메이커’S PICK">
        <div className={cx("container")}>
          {mockData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </Section>
      <Section title="요즘 인기있는 코스">
        <div className={cx("container")}>
          {mockData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default HomePage;

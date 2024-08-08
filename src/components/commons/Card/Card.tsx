import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss";
const cx = classNames.bind(styles);

interface CardProps {
  id: any;
  name: string;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ id, name, children }) => {
  const navigate = useNavigate();

  return (
    <div
      className={cx("card-container")}
      onClick={() => navigate(`/${name === "코스 찾기" ? "course" : "destination"}/${id}`)}>
      {children}
    </div>
  );
};

export default Card;

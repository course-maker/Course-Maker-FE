import { ReactNode } from "react";

interface DetailPageLayoutProps {
  header: ReactNode;
  main: ReactNode;
  // info: ReactNode;
}

const DetailPageLayout = ({ header, main }: DetailPageLayoutProps) => {
  return (
    <>
      {header}
      {main}
    </>
  );
};
export default DetailPageLayout;

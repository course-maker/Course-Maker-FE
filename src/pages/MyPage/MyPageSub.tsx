import MyPageLayout from "@/layout/MyPageSubLayout";
import { ReactNode } from "react";

interface MyPageSubProps {
  selectedMenu: string;
  content: ReactNode;
}

const MyPageSub = ({ selectedMenu, content }: MyPageSubProps) => {
  return (
    <>
      <MyPageLayout selectedMenu={selectedMenu}>{content}</MyPageLayout>
    </>
  );
};
export default MyPageSub;

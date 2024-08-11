import { TabBarIconProps } from "@/type/type";

const TabBarSearchIcon = ({ title, color }: TabBarIconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <circle cx="11" cy="11" r="6" stroke={color} />
      <path d="M20 20L17 17" stroke={color} strokeLinecap="round" />
    </svg>
  );
};
export default TabBarSearchIcon;

import { TabBarIconProps } from "@/type/type";

const TabBarHomeIcon = ({ title, color }: TabBarIconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path
        d="M5 12.8084C5 11.4506 5 10.7717 5.27446 10.175C5.54892 9.57826 6.06437 9.13645 7.09525 8.25284L8.09525 7.39569C9.95857 5.79856 10.8902 5 12 5C13.1098 5 14.0414 5.79856 15.9047 7.39569L16.9047 8.25284C17.9356 9.13645 18.4511 9.57826 18.7255 10.175C19 10.7717 19 11.4506 19 12.8084V17.0488C19 18.9344 19 19.8772 18.4142 20.463C17.8284 21.0488 16.8856 21.0488 15 21.0488H9C7.11438 21.0488 6.17157 21.0488 5.58579 20.463C5 19.8772 5 18.9344 5 17.0488V12.8084Z"
        stroke={color}
      />
      <path
        d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default TabBarHomeIcon;

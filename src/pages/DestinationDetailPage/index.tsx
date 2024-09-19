import DestinationHeader from "@/components/domains/detail/destination/DestinationHeader/DestinationHeader";
import DestinationInfo from "@/components/domains/detail/destination/DestinationInfo/DestinationInfo";
import DestinationMain from "@/components/domains/detail/destination/DestinationMain/DestinationMain";
import DestinationReview from "@/components/domains/detail/destination/DestinationReview/DestinationReview";
import DetailPageLayout from "@/layout/DetailPageLayout";

const DestinationDetailPage = () => {
  return (
    <DetailPageLayout
      type="destination"
      header={<DestinationHeader />}
      main={<DestinationMain />}
      info={<DestinationInfo />}
      review={<DestinationReview />}
    />
  );
};
export default DestinationDetailPage;

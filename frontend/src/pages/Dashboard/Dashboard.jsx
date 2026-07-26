import MainLayout from "../../components/layout/MainLayout";
import DashboardBody from "../../components/dashboard/DashboardBody";
import CollectionsPreview from "../../components/dashboard/CollectionsPreview";

const Dashboard = () => {
  return (
    <MainLayout>
      <DashboardBody />
      <CollectionsPreview />
    </MainLayout>
  );
};

export default Dashboard;
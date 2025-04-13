import MainContent from "./MainContent";
import AddContentModal from "./AddContentModal";
import { useRecoilValue } from "recoil";
import { ContentModal } from "../store/atoms/ContentModal";
import { shareBrainModal } from "../store/atoms/shareBrainModal";
import ShareBrainModal from "./ShareBrainModal";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const openContentModal = useRecoilValue(ContentModal);
  const openShareBrainModal = useRecoilValue(shareBrainModal);
  return (
    <div className="flex">
      {openContentModal && <AddContentModal />}
      {openShareBrainModal && <ShareBrainModal />}
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;

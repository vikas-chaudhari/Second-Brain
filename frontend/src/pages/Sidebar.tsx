import { useNavigate } from "react-router-dom";
import brain from "../assets/brain.png";
import DocumentIcon from "../components/icons/DocumentIcon";
import LinkIcon from "../components/icons/LinkIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import TwitterIcon from "../components/icons/svgrepo/TwitterIcon";
import YoutubeIcon from "../components/icons/svgrepo/YoutubeIcon";
import HomeIcon from "../components/icons/HomeIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SelectedFeedAtom } from "../store/atoms/SelectedFeedAtom";
import { contentAtom } from "../store/atoms/contentAtom";
import CopyBrainIcon from "../components/icons/CopyBrainIcon";
import { copyBrainModalAtom } from "../store/atoms/CopyBrainModalAtom";

type FeedType = "all" | "tweet" | "video" | "document" | "link";

const Sidebar = () => {
  const navigate = useNavigate();
  const setSelectedFeed = useSetRecoilState(SelectedFeedAtom);
  const content = useRecoilValue(contentAtom);
  const logoutHandler = async () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const feedHandler = (feedType: FeedType) => {
    if (feedType === "all") {
      setSelectedFeed(content);
      return;
    }
    const feed = content.filter(
      (card: { type: string }) => card.type === feedType
    );
    setSelectedFeed(feed);
  };
  return (
    <div className="w-64 relative h-screen border-r-[1px] border-slate-200">
      <div className="flex items-center gap-2 p-2">
        <div className="">
          <img src={brain} className="w-10" alt="" />
        </div>
        <h1 className="text-2xl font-bold text-blue-600">Second Brain</h1>
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-60px)]">
        <div className="flex flex-col justify-center py-6 gap-2">
          <div
            onClick={() => feedHandler("all")}
            className="flex items-center cursor-pointer px-4 py-1 gap-4 text-slate-500 hover:bg-slate-300 "
          >
            <HomeIcon />
            <h2 className="text-xl">Home</h2>
          </div>
          <div
            onClick={() => feedHandler("tweet")}
            className="flex items-center cursor-pointer px-4 py-1 gap-4 text-slate-500 hover:bg-slate-300 "
          >
            <TwitterIcon />
            <h2 className="text-xl">Tweets</h2>
          </div>
          <div
            onClick={() => feedHandler("video")}
            className="flex items-center cursor-pointer px-4 py-1 gap-4 text-slate-500 hover:bg-slate-300 "
          >
            <YoutubeIcon />
            <h2 className="text-xl">Videos</h2>
          </div>
          <div
            onClick={() => feedHandler("document")}
            className="flex items-center cursor-pointer px-4 py-1 gap-4 text-slate-500 hover:bg-slate-300 "
          >
            <DocumentIcon />
            <h2 className="text-xl">Documents</h2>
          </div>
          <div
            onClick={() => feedHandler("link")}
            className="flex items-center cursor-pointer px-4 py-1 gap-4 text-slate-500 hover:bg-slate-300 "
          >
            <LinkIcon />
            <h2 className="text-xl">Links</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            // @ts-ignore
            onClick={copyBrainModalAtom}
            className="w-[calc(100%-10px)] my-1 bg-purple-100 text-purple-600 text-2xl py-2 px-4 rounded-md flex justify-center items-center gap-2"
          >
            <div className="flex justify-center items-center pr-2 pl-3">
              <CopyBrainIcon />
            </div>
            Copy Brain
          </button>
          <button
            onClick={logoutHandler}
            className="w-[calc(100%-10px)] my-1 bg-red-600 bg-opacity-20 text-red-500 text-2xl py-2 px-4 rounded-md flex justify-center items-center gap-2"
          >
            <div className="flex justify-center items-center pr-2 pl-3">
              <LogoutIcon />
            </div>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

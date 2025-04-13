import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import ShareIcon from "../components/icons/ShareIcon";
import PlusIcon from "../components/icons/PlusIcon";
import Card from "../components/ui/Card";
import { contentAtom } from "../store/atoms/contentAtom";
import { ContentModal } from "../store/atoms/ContentModal";
import { shareBrainModal } from "../store/atoms/shareBrainModal";
import { SelectedFeedAtom } from "../store/atoms/SelectedFeedAtom";

const MainContent = () => {
  const setContent = useSetRecoilState(contentAtom);
  const selectedFeed = useRecoilValue(SelectedFeedAtom);

  const setOpenContentModal = useSetRecoilState(ContentModal);
  const setOpenShareBrainModal = useSetRecoilState(shareBrainModal);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get("http://localhost:3000/api/v1/content", {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      console.log(data);
      setContent(data);
    };
    fetchContent();
  }, []);

  const addContentModalHandler = async () => {
    setOpenContentModal(true);
  };
  const shareBrainHandler = () => {
    setOpenShareBrainModal(true);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      <div className="flex h-20 items-center px-5 py-2 justify-between bg-white border-b-[1px] border-gray-200 backdrop-blur-md w-full sticky">
        <div>
          <h1 className="text-4xl text-slate-700">All Notes</h1>
        </div>
        <div className="flex gap-2">
          <div>
            <Button
              variant="secondary"
              size="md"
              onClick={shareBrainHandler}
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
          </div>
          <div>
            <Button
              variant="primary"
              size="md"
              onClick={addContentModalHandler}
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
      </div>

      <div className="mx-10 my-5 justify-center items-center">
        <h1 className="text-6xl text-slate-500 my-4">Search Here...</h1>
        <textarea
          className="w-full min-h-32 text-2xl p-2 rounded-md shadow-lg"
          placeholder="Enter your search here..."
        ></textarea>
      </div>

      {/* content cards here */}
      <div className="flex flex-wrap gap-5 px-5 py-5 w-full overflow-auto">
        {selectedFeed
          ? selectedFeed.map((item: Card) => (
              <Card
                key={item._id}
                _id={item._id}
                type={item.type}
                title={item.title}
                link={item.link}
                tags={item.tags}
                createdAt={item.createdAt}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default MainContent;

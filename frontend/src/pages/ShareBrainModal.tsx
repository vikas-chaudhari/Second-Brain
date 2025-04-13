import { useRecoilValue, useSetRecoilState } from "recoil";
import CrossIcon from "../components/icons/CrossIcon";
import { shareBrainModal } from "../store/atoms/shareBrainModal";
import Button from "../components/ui/Button";
import CopyIcon from "../components/icons/CopyIcon";
import { useState } from "react";
import { contentAtom } from "../store/atoms/contentAtom";

const ShareBrainModal = () => {
  const setOpenShareBrainModal = useSetRecoilState(shareBrainModal);
  const [isCopied, setIsCopied] = useState(false);
  const items = useRecoilValue(contentAtom);
  const shareBrainHandler = () => {
    setOpenShareBrainModal(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-brain-title"
      className=" absolute z-50 backdrop-blur-md flex flex-col justify-center items-center h-screen w-screen top-0 left-0 bg-purple-300 bg-opacity-30 "
    >
      <div className="relative flex flex-col w-96 bg-gray-50 p-8 rounded-md">
        <div
          onClick={shareBrainHandler}
          className="absolute cursor-pointer right-3 top-3 flex justify-end items-center"
        >
          <CrossIcon />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl text-center text-slate-700">
            Share Your Second Brain
          </h1>
          <p className="text-gray-400 text-justify text-base">
            Share your entire collection of notes, documents, tweets, and videos
            with others. They'll be able to import your content into their own
            Second Brain.
          </p>

          <Button
            size="md"
            variant="primary"
            startIcon={<CopyIcon />}
            text="Share Brain"
            onClick={() => setIsCopied(true)}
          />
          {isCopied && (
            <p className="text-xl font-bold text-green-500 text-center">
              Copied
            </p>
          )}
          <p className="text-base text-center text-gray-400">
            {items.length || 0} items will be shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareBrainModal;

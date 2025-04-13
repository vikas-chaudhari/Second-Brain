import Button from "../components/ui/Button";
import { CopyIcon, CrossIcon } from "lucide-react";
import { copyBrainModalAtom } from "../store/atoms/CopyBrainModalAtom";
import { useSetRecoilState } from "recoil";

const CopyBrainModal = () => {
  const setOpenCopyBrainModal = useSetRecoilState(copyBrainModalAtom);

  const copyBrainHandler = () => {
    setOpenCopyBrainModal(false);
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
          onClick={copyBrainHandler}
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
            // onClick={() => setIsCopied(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CopyBrainModal;

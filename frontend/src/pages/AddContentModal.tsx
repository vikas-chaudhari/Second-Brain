import { useEffect, useRef } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import CrossIcon from "../components/icons/CrossIcon";
import { ContentModal } from "../store/atoms/ContentModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";
import { AllTagsAtom, selectedTagsAtom } from "../store/atoms/TagsAtom";
import TagsInput from "../components/ui/tagsInput";
import { contentAtom } from "../store/atoms/contentAtom";

const AddContentModal = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLSelectElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const setOpenContentModal = useSetRecoilState(ContentModal);
  const [Alltags, setAllTags] = useRecoilState(AllTagsAtom);
  const selectedTags = useRecoilValue(selectedTagsAtom);
  const setContent = useSetRecoilState(contentAtom);

  const addContentHandler = async () => {
    const title = titleRef.current?.value?.trim();
    const type = typeRef.current?.value;
    const link = linkRef.current?.value?.trim();

    if (!title || !type || !link) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/add-content",
        { title, type, link, tags: selectedTags },
        {
          headers: { Authorization: token },
        }
      );
      console.log("Content added successfully:", data);
      setOpenContentModal(false);
    } catch (error) {
      console.error("Error adding content:", error);
    }
  };

  const addContentModalHandler = () => {
    setOpenContentModal(false);
  };

  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/tags", {
          headers: { authorization: localStorage.getItem("token") || "" },
        });
        setAllTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getAllTags();
  }, [setAllTags]);

  return (
    <div className="absolute z-50 backdrop-blur-md flex flex-col justify-center items-center h-screen w-screen top-0 left-0 bg-purple-300 bg-opacity-30">
      <div className="relative flex flex-col w-96 bg-gray-50 p-8 rounded-md">
        <div
          onClick={addContentModalHandler}
          className="absolute cursor-pointer right-3 top-3 flex justify-end items-center"
        >
          <CrossIcon />
        </div>
        <div className="flex flex-col gap-5 text-slate-700">
          <h1 className="text-2xl text-center">Add Content</h1>
          <Input
            type="text"
            placeholder="Enter title here"
            reference={titleRef}
          />

          <select
            className="border py-3 rounded-md px-4 text-gray-400"
            ref={typeRef}
            aria-label="Select content type"
          >
            <option value="">Content Type</option>
            <option value="video">Video</option>
            <option value="tweet">Tweet</option>
            <option value="link">Link</option>
            <option value="document">Document</option>
          </select>

          <Input
            type="text"
            placeholder="Paste link here"
            reference={linkRef}
          />
          <h1 className="text-xl font-semibold text-slate-500">Select Tags</h1>
          <TagsInput tagsList={Alltags} />
          <Button
            size="md"
            variant="primary"
            text="Add Content"
            onClick={addContentHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;

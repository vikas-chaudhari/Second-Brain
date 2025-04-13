import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedTagsAtom } from "../../store/atoms/TagsAtom";

interface tagInterface {
  _id: string;
  title: string;
}

interface Props {
  tagsList: tagInterface[]; // tagsList is an array of tagInterface
}

const TagsInput: React.FC<Props> = ({ tagsList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsAtom);

  // Filter tags based on search query (case-insensitive match with `title`)
  const filteredTags = tagsList.filter(
    (tag: tagInterface) =>
      tag.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedTags.some((selected: tagInterface) => selected._id === tag._id)
  );

  // Add a tag to the selectedTags list
  const handleSelectTag = (tag: tagInterface) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchQuery(""); // Clear the input
  };

  // Remove a tag from the selectedTags list
  const handleRemoveTag = (tag: tagInterface) => {
    setSelectedTags(
      selectedTags.filter((t: tagInterface) => t._id !== tag._id)
    );
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-col gap-2 p-2 border border-gray-300 rounded-lg bg-white shadow">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-white max-h-40 overflow-auto">
            {selectedTags.map((tag: tagInterface) => (
              <div
                key={tag._id}
                className="flex items-center bg-purple-100  text-purple-600 px-3 py-1 rounded-full text-sm border"
              >
                <span>{tag.title}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-purple-600"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type a tag..."
          className="flex-1 border-none focus:ring-0 outline-none text-sm"
        />
      </div>
      {searchQuery && filteredTags.length > 0 && (
        <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-auto bg-white text-gray-400 shadow">
          {filteredTags.map((tag: tagInterface) => (
            <li
              key={tag._id}
              onClick={() => handleSelectTag(tag)}
              className="p-2 cursor-pointer hover:bg-blue-100"
            >
              {tag.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsInput;

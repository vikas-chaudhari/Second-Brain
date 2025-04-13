import { atom } from "recoil";

interface tagInterface {
  _id: string;
  title: string;
}

export const AllTagsAtom = atom<tagInterface[]>({
  key: "AllTagsAtom",
  default: [],
});

export const selectedTagsAtom = atom<tagInterface[]>({
  key: "selectedTagsAtom",
  default: [],
});

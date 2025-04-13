import { atom } from "recoil";
import { contentAtom } from "./contentAtom";

export const SelectedFeedAtom = atom({
  key: "SelectedFeedAtom",
  default: contentAtom,
});

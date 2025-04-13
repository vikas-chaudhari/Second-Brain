import { atom } from "recoil";

const contentAtom = atom({
  key: "contentAtom",
  default: [],
});
export { contentAtom };

import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: "",
  contract: null,
  nfts: [],
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars);
    let end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start += ".";
    }
    return start + end;
  }
  return text;
};

export { useGlobalState, getGlobalState, setGlobalState, truncate };

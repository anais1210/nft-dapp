import { createGlobalState } from "react-hooks-global-state";
const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: "",
  contract: null,
  nfts: [],
  alert: { show: false, msg: "", color: "" },
  loading: { show: false, msg: "" },
});

const setAlert = (msg, color = "green") => {
  setGlobalState("alert", { show: true, msg, color });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", color });
    setGlobalState("loading", false);
  }, 8000);
};

const setLoadingMsg = (msg) => {
  const loading = geetGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};

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

export {
  useGlobalState,
  getGlobalState,
  setGlobalState,
  truncate,
  setAlert,
  setLoadingMsg,
};

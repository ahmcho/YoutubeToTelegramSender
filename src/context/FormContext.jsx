import React, { createContext, useState } from "react";
import { useLoader } from "./LoaderContext";
import { useToast } from "./ToastContext";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [botToken, setBotToken] = useState(localStorage.getItem("BOT_TOKEN") || "");
  const [chatId, setChatId] = useState(localStorage.getItem("CHAT_ID") || "");
  const [autoSend, setAutoSend] = useState(JSON.parse(localStorage.getItem("AUTOPLAY")) ?? true);
  const [tab, setTab] = useState(null);
  const { showToast } = useToast();

  
  const { loading, setLoading } = useLoader();

  const handleTokenChange = (e) => setBotToken(e.target.value);
  const handleChatIdChange = (e) => setChatId(e.target.value);
  const handleAutoSendChange = () => setAutoSend(!autoSend);

  const sendMessage = async () => {

    setLoading(true);
    document.body.style.height = "110vh";
    document.body.classList.add("animated-body");

    if (!tab || !tab.url.includes("youtube.com/watch")) {
      showToast("error", "Only YouTube video pages are supported");
      setLoading(false);
      return;
    }
    if (!botToken || !chatId) {
      showToast("error", "Please fill in both BOT TOKEN and CHAT ID");
      setLoading(false);
      return;
    }

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        function: executeScriptFunc,
        args: [chatId, botToken],
      },
      () => {
        chrome.storage.sync.get("isVideoPlayerPage", ({ isVideoPlayerPage }) => {
          setTimeout(() => {
            if (isVideoPlayerPage) {
              showToast("success", "Message was sent");
            } else {
              showToast("error", "Please navigate to a video");
            }
            setLoading(false);
          }, 1000);
        });
      }
    );
  };

  function executeScriptFunc(chatId, botId) {
    if (!window.location.href.includes("watch")) {
      chrome.storage.sync.set({ isVideoPlayerPage: false });
      return;
    }
    let seconds = [...document.querySelectorAll(".ytp-progress-bar")].reduce(
      (acc, item) => item.getAttribute("aria-valuenow") || acc,
      0
    );
    const ytUrl = new URLSearchParams(window.location.search).get("v");
    if (!ytUrl) return;
    const url = `https://youtu.be/${ytUrl}?t=${seconds}`;
    fetch(`https://api.telegram.org/bot${botId.trim()}/sendMessage?text=${encodeURIComponent(url)}&chat_id=${chatId.trim()}`)
      .then((res) => res.json())
      .then((resJSON) => {
        chrome.storage.sync.set({ isVideoPlayerPage: true, response: resJSON });
      })
      .catch((error) => console.error(error));
  }

  return (
    <FormContext.Provider
      value={{
        botToken,
        chatId,
        autoSend,
        onTokenChange: handleTokenChange,
        onChatIdChange: handleChatIdChange,
        onAutoSendChange: handleAutoSendChange,
        sendMessage,
        executeScriptFunc,
        tab,
        setTab
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

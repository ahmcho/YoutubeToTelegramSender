import React, { useContext, useEffect } from "react";
import { FormContext } from "../context/FormContext";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Button from "./Button";

const Form = () => {
  const {
    botToken,
    chatId,
    tab,
    autoSend,
    onTokenChange,
    onChatIdChange,
    onAutoSendChange,
    sendMessage,
    executeScriptFunc,
    setTab,
  } = useContext(FormContext);

  useEffect(() => {
    localStorage.setItem("BOT_TOKEN", botToken);
  }, [botToken]);
  useEffect(() => {
    localStorage.setItem("CHAT_ID", chatId);
  }, [chatId]);
  useEffect(() => {
    localStorage.setItem("AUTOPLAY", JSON.stringify(autoSend));
  }, [autoSend]);

  useEffect(() => {
    if (autoSend && tab) {
      setTimeout(sendMessage, 1000);
    }
  }, [autoSend, tab]);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getActiveTab" }, (res) => {
      if (!chrome.runtime.lastError) {
        setTab(res?.tab);
      }
    });
  }, []);

  return (
    <form>
      <Input
        placeholder="Your bot token"
        label="BOT TOKEN"
        onChange={onTokenChange}
        value={botToken}
      />
      <Input
        placeholder="Your chat ID"
        label="CHAT ID"
        onChange={onChatIdChange}
        value={chatId}
      />
      <div className="mt-4 flex justify-center">
        <Checkbox
          onChange={onAutoSendChange}
          checked={autoSend}
          label="Autosend on opening?"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Button onClick={sendMessage} label="Send" />
      </div>
    </form>
  );
};

export default Form;

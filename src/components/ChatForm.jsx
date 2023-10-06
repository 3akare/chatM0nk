import React from "react";
import ChatBox from "./ChatBox";
import SendButton from "./SendButton";

export default function ChatForm({ text, handleClick, handleChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bottom-8 w-full fixed flex flex-row items-center justify-center gap-2"
    >
        <ChatBox text={text} handleChange={handleChange} />
        <SendButton text={text} />
    </form>
  );
}

import React from "react";

export default function ChatBox({ text, handleChange }) {
  const childHandleChange = (event) => {
    handleChange(event);
  };
  return (
    <input
      value={text}
      onChange={childHandleChange}
      type="text"
      placeholder="Type here"
      className="input input-bordered w-[65%] max-w-md font-mono"
    />
  );
}

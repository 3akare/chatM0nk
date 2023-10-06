import React, { useState, useEffect, useRef } from "react";
import ChatForm from "../components/ChatForm";
import { addMessage, collectionRef } from "../utils/index";
import {
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatPage() {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const chatContainerRef = useRef();

  const handleChange = (x) => {
    const { value } = x.target;
    setText(value);
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleClick = () => {
    addMessage({ text: text, createdAt: serverTimestamp() });
    setArray((oldArray) => {
      return [...oldArray, text];
    });
    setText("");
  };

  useEffect(() => {
    const q = query(collectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => {
        return doc.data().text;
      });
      setArray(updatedMessages);
    });

    // Scroll to the bottom when new data arrives
    scrollToBottom();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever the `array` state changes
    scrollToBottom();
  }, [array]);

  return (
    <>
      <div className="w-[100%] h-[95vh] relative p-0 m-0 font-mono">
        <div className="navbar bg-base-100">
          <div className="flex-1 fixed z-10">
            <a className="normal-case text-xl">chatM0nk</a>
          </div>
          <div className="flex-none">
            {/* <input type="checkbox" className="toggle border-r-black" checked /> */}
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="w-full h-full overflow-y-auto"
          style={{ maxHeight: "78vh" }}
        >
          {array.map((item, index) => (
            <div key={index} className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary min-h-fit">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatForm
        text={text}
        handleClick={handleClick}
        handleChange={handleChange}
      />
    </>
  );
}

import React, { useState, useEffect, Fragment, useRef } from "react";
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
  const viewRef = useRef();

  const handleChange = (x) => {
    const { value } = x.target;
    setText(value);
    event();
  };

  const event = () => {
    viewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = () => {
    addMessage({ text: text, createdAt: serverTimestamp() });
    setArray((oldArray) => {
      return [...oldArray, text];
    });
    event();
    setText("");
  };

  useEffect(() => {
    const q = query(collectionRef, orderBy("createdAt", "asc"));
    const unsubcribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => {
        event();
        return doc.data().text;
      });
      setArray(updatedMessages);
    });
    return () => unsubcribe();
  }, []);

  return (
    <>
      <div className="w-screen h-[95vh] relative p-0 m-0 font-mono">
        <div className="navbar bg-base-100">
          <div className="flex-1 fixed z-10">
            <a className="normal-case text-xl">chatM0nk</a>
          </div>
          <div className="flex-none">
            {/* <input type="checkbox" className="toggle border-r-black" checked /> */}
          </div>
        </div>
        {array.map((item, index) => {
          return (
            <div key={index} className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary min-h-fit">
                {item}
              </div>
            </div>
          );
        })}
        <div ref={viewRef} className="w-40 h-40"></div>
      </div>
      <ChatForm
        text={text}
        handleClick={handleClick}
        handleChange={handleChange}
      />
    </>
  );
}

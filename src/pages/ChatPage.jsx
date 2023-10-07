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
  const [userObj, setUSerObject] = useState({});
  const chatContainerRef = useRef();

  const handleChange = (x) => {
    const { value } = x.target;
    setText(value);
  };

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleClick = () => {
    addMessage({
      text: text,
      createdAt: serverTimestamp(),
      userId: userObj.userId,
      photoURL: userObj.displayImg,
    });
    setArray((oldArray) => {
      return [...oldArray, text];
    });
    setText("");
  };

  useEffect(() => {
    const q = query(collectionRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => {
        return [doc.data().text, doc.data().userId, doc.data().photoURL];
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chatMonkUser"));
    setUSerObject((old) => {
      return { ...old, userId: user.uid, displayImg: user.photoURL };
    });
  }, []);
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
            <div
              key={index}
              className={`chat ${
                item[1] === userObj.userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={item[2]} />
                </div>
              </div>
              <div className="chat-header">{userObj.userName}</div>
              <div
                className={`chat-bubble min-h-fit ${
                  item[1] === userObj.userId ? "chat-bubble-primary" : ""
                }`}
              >
                {item[0]}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
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

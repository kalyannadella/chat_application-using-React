import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const [showOptions, setShowOptions] = useState(false);

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp?.seconds * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)} h ago`;
    } else {
      return date.toLocaleString();
    }
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleDeleteForMe = async () => {
    try {
      // Update the message to mark it as deleted for the current user
      const messageRef = doc(db, "chats", data.chatId, "messages", message.id);
      await updateDoc(messageRef, {
        [`deletedFor.${currentUser.uid}`]: true,
      });
    } catch (err) {
      console.error("Error deleting message for me:", err);
    }
  };

  const handleDeleteForBoth = async () => {
    try {
      // Delete the message document
      const messageRef = doc(db, "chats", data.chatId, "messages", message.id);
      await deleteDoc(messageRef);
    } catch (err) {
      console.error("Error deleting message for both users:", err);
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatDate(message.date)}</span>
        <button
          className="optionsButton"
          onClick={() => setShowOptions(!showOptions)}
        >
          ...
        </button>
        {showOptions && (
          <div className="optionsMenu">
            <button onClick={handleDeleteForMe}>Delete for me</button>
            <button onClick={handleDeleteForBoth}>Delete for both</button>
          </div>
        )}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="Image" />}
        {message.pdf && (
          <div className="pdfContainer">
            <a href={message.pdf} target="_blank" rel="noopener noreferrer">
              <span className="pdfName">{message.pdfName || "PDF File"}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

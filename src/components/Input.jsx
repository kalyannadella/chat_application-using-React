import React, { useContext, useState } from "react";
import Img from "../assets/img.png";
// import Attach from "../assets/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const [fileName, setFileName] = useState(""); // For PDF preview

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img || pdf) {
      const file = img || pdf;
      const fileType = img ? "image" : "pdf";
      const storageRef = ref(storage, uuid());
  
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Error uploading file: ", error); // Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const messageData = {
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            };
  
            if (fileType === "image") {
              messageData.img = downloadURL;
            } else if (fileType === "pdf") {
              messageData.pdf = downloadURL;
              messageData.pdfName = fileName;
            }
  
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion(messageData),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
  
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    setText("");
    setImg(null);
    setPdf(null);
    setPreviewUrl(null); // Reset the preview URL after sending the message
    setFileName(""); // Reset the file name
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType === "image") {
      setImg(file);
      setPdf(null); // Reset PDF if an image is selected

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFileName(""); // Reset file name for images
      };
      reader.readAsDataURL(file);
    } else if (fileType === "application" && file.type === "application/pdf") {
      setPdf(file);
      setImg(null); // Reset image if a PDF is selected

      // Set the file name for PDF preview
      setFileName(file.name);
      setPreviewUrl(null); // No image preview for PDFs
    } else {
      console.error("Unsupported file type");
    }
  };

  const removeFile = () => {
    setImg(null);
    setPdf(null);
    setPreviewUrl(null);
    setFileName("");
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      {previewUrl && (
        <div className="file-preview">
          <img src={previewUrl} alt="Preview" />
          <button onClick={removeFile}>Remove Image</button>
        </div>
      )}
      {fileName && (
        <div className="file-preview">
          <p>{fileName}</p>
          <button onClick={removeFile}>Remove File</button>
        </div>
      )}
      <div className="send">
        
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <img src={Img} alt="Add Image or File" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;

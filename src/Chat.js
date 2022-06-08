import "./css/Chat.css";
import db from "./firebase";
import { serverTimestamp } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Picker from "emoji-picker-react";
//Icons Import*************//
import { Avatar, Modal, Box, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import EmojiIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicIcon from "@mui/icons-material/MicOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";
//Icons Import*************//

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const { roomId } = useParams();

  const [{ user, theme }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setInput(`${input + emojiObject.emoji}`);
  };

  const emojiStyle = {
    position: "absolute",
    top: "64%",
    left: "48%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
      email: user.email,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div
        className={`chat-header ${theme === "dark" ? "chat-header-dark" : ""}`}
      >
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />

        <div
          className={`chat-headerInfo ${
            theme === "dark" ? "chat-header-info-dark" : ""
          }`}
        >
          <h3>{roomName}</h3>
          <p>{`Last seen at ${new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
          )
            .toUTCString()
            .slice(4, 22)}`}</p>
        </div>

        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
          <IconButton>
            <MoreVert
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
        </div>
      </div>

      <div className={`chat-body ${theme === "dark" ? "chat-body-dark" : ""}`}>
        {messages.map((message) => (
          <React.Fragment>
            <div
              className={`chat-message
                ${
                  message.email === user.email
                    ? theme === "dark"
                      ? "chat-receiver chat-receiver-dark"
                      : "chat-receiver"
                    : theme === "dark"
                    ? "chat-sender chat-sender-dark"
                    : "chat-sender"
                }`}
            >
              <p
                className={`chat-name ${
                  theme === "dark" ? "chat-name-dark" : ""
                }`}
              >
                {message.name}
              </p>
              <p
                className={`chat-content ${
                  theme === "dark" ? "chat-content-dark" : ""
                }`}
              >
                {message.message}
                <span className="chat-timestamp">
                  {new Date(message.timestamp?.toDate())
                    .toUTCString()
                    .slice(4, 22)}
                </span>
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div
        className={`chat-footer ${theme === "dark" ? "chat-footer-dark" : ""}`}
      >
        <IconButton onClick={(e) => setShowPicker(true)}>
          <EmojiIcon
            style={theme === "dark" ? { color: "#8696a0" } : { color: "gray" }}
          />
        </IconButton>
        <Modal
          open={showPicker}
          onClose={() => setShowPicker(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={emojiStyle}>
            <Picker onEmojiClick={onEmojiClick} />
          </Box>
        </Modal>
        <IconButton>
          <AttachFileIcon
            style={theme === "dark" ? { color: "#8696a0" } : { color: "gray" }}
          />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a Message"
          />
          <button onClick={(e) => sendMessage(e)} type="submit" />
        </form>

        {input ? (
          <IconButton onClick={sendMessage}>
            <SendIcon
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
        ) : (
          <IconButton>
            <MicIcon
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
        )}
      </div>
    </div>
  );
}

export default Chat;

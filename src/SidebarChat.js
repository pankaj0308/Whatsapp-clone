import "./css/SidebarChat.css";
import React, { useState, useEffect, Fragment } from "react";
import { Avatar, Modal, Box, Typography } from "@mui/material";
import Add from "@mui/icons-material/AddCircleOutlineOutlined";
import db from "./firebase";
import { Link } from "react-router-dom";
import { modalStyle } from "./modalStyle";
import { useStateValue } from "./StateProvider";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ theme }, dispatch] = useStateValue();

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const saveRoomName = (e) => {
    e.preventDefault();
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
    setShowModal(false);
  };

  return !addNewChat ? (
    <Link
      className={`links ${theme === "dark" ? "links-dark" : ""}`}
      to={`/rooms/${id}`}
    >
      <div
        className={`sidebarChat-container ${
          theme === "dark" ? "sidebarChat-container-dark" : ""
        }`}
      >
        <Avatar src={`https://avatars.dicebear.com/api/micah/${seed}.svg`} />
        <div
          className={`sidebarChat-info ${
            theme === "dark" ? "sidebarChat-info-dark" : ""
          }`}
        >
          <h2>{name}</h2>
          <p>{`${messages[0]?.name}: ${messages[0]?.message}`}</p>
        </div>
      </div>
    </Link>
  ) : (
    <>
      <div
        className={`sidebarChat-container ${
          theme === "dark" ? "sidebarChat-container-dark" : ""
        }`}
        onClick={() => setShowModal(true)}
      >
        <Add
          style={theme === "dark" ? { color: "white" } : { color: "black" }}
        />
        <h3>Add New Room</h3>
      </div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter the Room Name
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              className="modal-input"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="modal-button" onClick={saveRoomName}>
              Submit
            </button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default SidebarChat;

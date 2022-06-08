import "./css/Sidebar.css";
import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
// import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user, theme }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const setThemeDark = () => {
    dispatch({
      type: actionTypes.SET_THEME,
      theme: "dark",
    });
  };

  const setThemeLight = () => {
    dispatch({
      type: actionTypes.SET_THEME,
      theme: "",
    });
  };

  return (
    <div className="sidebar">
      <div
        className={`sidebar-header  ${
          theme === "dark" ? "sidebar-header-dark" : ""
        }`}
      >
        <Avatar src={user?.photoURL} />
        <div className="sidebar-headerRight">
          {theme === "" ? (
            <IconButton onClick={setThemeDark}>
              <ModeNightIcon
                style={
                  theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
                }
              />
            </IconButton>
          ) : (
            <IconButton onClick={setThemeLight}>
              <LightModeIcon
                style={
                  theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
                }
              />
            </IconButton>
          )}

          <IconButton>
            <ChatIcon
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              style={
                theme === "dark" ? { color: "#8696a0" } : { color: "gray" }
              }
            />
          </IconButton>
        </div>
      </div>
      <div
        className={`sidebar-search ${
          theme === "dark" ? "sidebar-search-dark" : ""
        }`}
      >
        <div
          className={`sidebar-searchContainer ${
            theme === "dark" ? "sidebar-searchContainer-dark" : ""
          }`}
        >
          <SearchOutlinedIcon />
          <input placeholder="Search or Start new Chat" type="text" />
        </div>
      </div>
      <div
        className={`sidebar-chat ${
          theme === "dark" ? "sidebar-chat-dark" : ""
        }`}
      >
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

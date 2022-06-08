import "./css/App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user, theme }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className={`app-body ${theme === "dark" ? "app-body-dark" : ""}`}>
          <Router>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />}></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

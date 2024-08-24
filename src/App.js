import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("dark");
  const [style, setStyle] = useState({
    color: "white",
    backgroundColor: "color",
  });

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
      document.body.style.backgroundColor =
        savedMode === "light" ? "black" : "white";
    }
  }, []);

  useEffect(() => {
    if (mode === "light") {
      setStyle({
        color: "black",
        backgroundColor: "white",
      });
      localStorage.setItem("mode", "dark");
      document.body.style.backgroundColor = "white";
    } else {
      setStyle({
        color: "white",
        backgroundColor: "black",
      });
      localStorage.setItem("mode", "light");
      document.body.style.backgroundColor = "black";
    }
  }, [mode]);
  const toogleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <>
      <Router>
        <Navbar mode={mode} toogleMode={toogleMode} />
        <Routes>
        <Route exact path="/" element={<News key="general"  mode={mode} style={style} pageSize={12} category="general" /> } /> 
        { /* <Route exact path="/general" element={<News key="general"  mode={mode} style={style} pageSize={10} category="general" /> } /> */}
        <Route exact path="/business" element={<News key="business" mode={mode} style={style} pageSize={12} category="business" />} /> 
        <Route exact path="/entertainment" element={<News key="entertainment" mode={mode} style={style} pageSize={12} category="entertainment" />} />
        <Route exact path="/health" element={<News key="health" mode={mode} style={style} pageSize={12} category="health" />} />
        <Route exact path="/science" element={<News key="science" mode={mode} style={style} pageSize={12} category="science" />} />
        <Route exact path="/sports" element={<News key="sports" mode={mode} style={style} pageSize={12} category="sports" />} />
        <Route exact path="/technology" element={<News key="technology" mode={mode} style={style} pageSize={12} category="technology" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;




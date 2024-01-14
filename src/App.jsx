import "./App.css";
import Mainpage from "./components/Mainpage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
